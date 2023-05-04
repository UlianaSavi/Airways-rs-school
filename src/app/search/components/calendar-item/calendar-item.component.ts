import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
})
export class CalendarItemComponent {
  @Input() date: Date = new Date();

  @Input() selectDate: Date = new Date();

  @Input() price = 0;

  dateFormat = 'dd LLL';

  currentCurrency$ = this.store.select(CurrencyDateSelectors.selectCurrencyFormat);

  constructor(private store: Store) {}
}
