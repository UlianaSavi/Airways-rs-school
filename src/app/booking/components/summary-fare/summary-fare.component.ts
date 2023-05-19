import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PassengersType } from 'src/app/core/models/passengers.model';
import { selectCurrencyFormat } from 'src/app/redux/selectors/currency-date.selectors';

@Component({
  selector: 'app-summary-fare',
  templateUrl: './summary-fare.component.html',
  styleUrls: ['./summary-fare.component.scss'],
})
export class SummaryFareComponent {
  @Input() passengersCount: Record<PassengersType, number> = { adult: 1, child: 0, infant: 0 };

  @Input() fare: Record<PassengersType, number> = { adult: 0, child: 0, infant: 0 };

  @Input() total = 0;

  passengerTypeArr: PassengersType[] = <PassengersType[]>Object.keys(this.passengersCount);

  currentCurrency$ = this.store.select(selectCurrencyFormat);

  constructor(private store: Store) {}
}
