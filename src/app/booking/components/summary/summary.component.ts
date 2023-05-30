import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { Booking } from 'src/app/core/models/booking.model';
import { PassengersType } from 'src/app/core/models/passengers.model';
import { PopupsStatusService } from 'src/app/core/services/popups-status.service';
import { addBooking } from 'src/app/redux/actions/booking.actions';
import { selectPassengersDataFeature } from 'src/app/redux/selectors/passengers.selectors';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket, ITicketExtended } from 'src/app/search/models/tickets.model';
import { PassengersState } from '../../../redux/reducers/passengers.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleBuyService } from '../../../core/services/single-buy.service';
import { selectBookings, selectPurchasedTickets } from 'src/app/redux/selectors/booking.selectors';

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
  ticket: ITicket | ITicketExtended | null = null;

  backTicket: ITicket | ITicketExtended | null = null;

  passengersCount: Record<PassengersType, number> = { adult: 1, child: 0, infant: 0 };

  passengersData: PassengersState | undefined;

  passengerTypeArr: PassengersType[] = <PassengersType[]>Object.keys(this.passengersCount);

  totalPrice = 0;

  id = '';

  viewOnly = false;

  bookings$: Observable<Booking[]> = this.store.select(selectBookings);

  bookingItems: Booking[] = [];

  purchasedTickets$: Observable<Booking[]> = this.store.select(selectPurchasedTickets);

  purchasedTickets: Booking[] = [];

  constructor(
    private store: Store,
    private popupsService: PopupsStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private singleBuyService: SingleBuyService
  ) {}

  ngOnInit(): void {
    const previousPage = this.route.snapshot.queryParamMap.get('from');
    if (previousPage) {
      this.viewOnly = true;
    }

    this.bookings$.subscribe((bookings) => (this.bookingItems = bookings));

    this.purchasedTickets$.subscribe((bookings) => (this.purchasedTickets = bookings));

    this.store
      .select(selectTicket)
      .pipe(take(1))
      .subscribe((_ticket) => (this.ticket = _ticket));
    this.store
      .select(selectBackTicket)
      .pipe(take(1))
      .subscribe((_ticket) => (this.backTicket = _ticket));
    this.store
      .select(selectPassengersDataFeature)
      .pipe(take(1))
      .subscribe((passengersData) => {
        this.passengersCount = {
          adult: passengersData.data.adult.length,
          child: passengersData.data.child.length,
          infant: passengersData.data.infant.length,
        };
        this.passengersData = passengersData;
      });
    this.totalPrice = this.getTotal();
  }

  private getFareCurrentPassenger(passenger: PassengersType): number {
    const priceTicket: number = this.ticket ? Number(this.ticket.price) : 0;
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

  private createBookingObj(): Booking {
    if (this.id === '') this.id = uuidV4() as string;

    const booking: Booking = {
      id: this.id,
      city: {
        from: this.ticket!.country.from,
        to: this.ticket!.country.to,
      },
      ticket: {
        date: this.ticket!.date.toLocaleString(),
        times: this.ticket!.times,
        flightNum: this.ticket!.flightNum,
      },
      passengers: this.passengersCount,
      price: this.totalPrice,
      ticketsInfo: {
        ticket: this.ticket as ITicketExtended,
        backTicket: (this.backTicket || null) as ITicketExtended,
      },
      passengersData: this.passengersData!,
    };

    if (this.backTicket) {
      booking.backTicket = {
        date: this.backTicket.date.toLocaleString(),
        times: this.backTicket.times,
        flightNum: this.backTicket.flightNum,
      };
    }

    return booking;
  }

  public addToCart(): void {
    if (this.ticket === null) return;

    const booking = this.createBookingObj();

    this.store.dispatch(addBooking({ booking: booking }));

    this.router.navigate(['/cart']);
  }

  public openPayment = () => {
    const booking = this.createBookingObj();

    this.singleBuyService.setTicket(booking);

    this.popupsService.setPaymentStatus(true);
  };

  public hasInCartAndPurchased(): boolean {
    const currentBooking = this.createBookingObj();

    const hasInCart = !!this.bookingItems.filter(
      (booking) =>
        booking.city.from === currentBooking.city.from &&
        booking.city.to === currentBooking.city.to &&
        booking.price === currentBooking.price &&
        JSON.stringify(booking.ticket) === JSON.stringify(currentBooking.ticket)
    ).length;

    const hasInPurchased = !!this.purchasedTickets.filter(
      (booking) =>
        booking.city.from === currentBooking.city.from &&
        booking.city.to === currentBooking.city.to &&
        booking.price === currentBooking.price &&
        JSON.stringify(booking.ticket) === JSON.stringify(currentBooking.ticket)
    ).length;

    return hasInCart || hasInPurchased;
  }
}
