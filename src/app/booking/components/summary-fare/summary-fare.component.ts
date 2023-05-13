import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { PassengersType } from 'src/app/core/models/passengers.model';
import { selectCurrencyFormat } from 'src/app/redux/selectors/currency-date.selectors';
import { selectPassengersData } from 'src/app/redux/selectors/passengers.selectors';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from 'src/app/search/models/tickets.model';

const ticketPriceMultiplier: Record<PassengersType, number> = {
  adult: 1,
  child: 0.762,
  infant: 0.381,
};

@Component({
  selector: 'app-summary-fare',
  templateUrl: './summary-fare.component.html',
  styleUrls: ['./summary-fare.component.scss'],
})
export class SummaryFareComponent implements OnInit {
  ticket: ITicket | null = null;

  backTicket: ITicket | null = null;

  passengersCount: Record<PassengersType, number> = { adult: 1, child: 0, infant: 0 };

  currentCurrency$ = this.store.select(selectCurrencyFormat);

  passengerTypeArr: PassengersType[] = ['adult', 'child', 'infant'];

  constructor(private store: Store) {}

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
  }

  public getFare(passenger: PassengersType): number {
    const priceTicket: number = this.ticket ? this.ticket.price : 0;
    const priceBackTicket: number = this.backTicket ? Number(this.backTicket.price) : 0;
    return (
      (priceTicket + priceBackTicket) *
      this.passengersCount[passenger] *
      ticketPriceMultiplier[passenger]
    );
  }

  public getTotal(): number {
    return this.passengerTypeArr.reduce((acc, passenger) => this.getFare(passenger) + acc, 0);
  }
}
