import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Booking } from 'src/app/core/models/booking.model';
import { PassengersType } from 'src/app/core/models/passengers.model';
import { addBooking } from 'src/app/redux/actions/booking.actions';
import { selectPassengersData } from 'src/app/redux/selectors/passengers.selectors';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from 'src/app/search/models/tickets.model';

const ticketPriceMultiplier: Record<PassengersType, number> = {
  adult: 1,
  child: 0.762,
  infant: 0.381,
};

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  ticket: ITicket | null = null;

  backTicket: ITicket | null = null;

  passengersCount: Record<PassengersType, number> = { adult: 1, child: 0, infant: 0 };

  passengerTypeArr: PassengersType[] = <PassengersType[]>Object.keys(this.passengersCount);

  totalPrice = 0;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectTicket)
      .pipe(take(1))
      .subscribe((_ticket) => (this.ticket = _ticket));
    this.store
      .select(selectBackTicket)
      .pipe(take(1))
      .subscribe((_ticket) => (this.backTicket = _ticket));
    this.store
      .select(selectPassengersData)
      .pipe(take(1))
      .subscribe(
        (passengersData) =>
          (this.passengersCount = {
            adult: passengersData.adult.length,
            child: passengersData.child.length,
            infant: passengersData.infant.length,
          })
      );
    this.totalPrice = this.getTotal();
  }

  private getFareCurrentPassenger(passenger: PassengersType): number {
    const priceTicket: number = this.ticket ? this.ticket.price : 0;
    const priceBackTicket: number = this.backTicket ? Number(this.backTicket.price) : 0;
    return (
      (priceTicket + priceBackTicket) *
      this.passengersCount[passenger] *
      ticketPriceMultiplier[passenger]
    );
  }

  private getTotal(): number {
    return this.passengerTypeArr.reduce((acc, passenger) => this.getFare()[passenger] + acc, 0);
  }

  public getFare(): Record<PassengersType, number> {
    return {
      adult: this.getFareCurrentPassenger('adult'),
      child: this.getFareCurrentPassenger('child'),
      infant: this.getFareCurrentPassenger('infant'),
    };
  }

  public buyNow(): void {
    this.router.navigateByUrl('/cart');
  }

  public addToCart(): void {
    if (this.ticket === null) return;

    const booking: Booking = {
      id: Math.ceil(Math.random() * 10_000),
      city: {
        from: this.ticket.country.from,
        to: this.ticket.country.to,
      },
      ticket: {
        date: this.ticket.date.toLocaleString(),
        times: this.ticket.times,
        flightNum: this.ticket.flightNum,
      },
      passengers: this.passengersCount,
      price: this.totalPrice,
    };

    if (this.backTicket) {
      booking.backTicket = {
        date: this.backTicket.date.toLocaleString(),
        times: this.backTicket.times,
        flightNum: this.backTicket.flightNum,
      };
    }

    this.store.dispatch(addBooking({ booking: booking }));
  }
}
