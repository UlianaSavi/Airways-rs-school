import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from '../../models/tickets.model';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  constructor(private route: ActivatedRoute, private store: Store) {}

  currentCurrency$ = this.store.select(CurrencyDateSelectors.selectCurrencyFormat);

  @Input() currTicket: ITicket | null = null;

  public getDuration(): string {
    if (!this.currTicket) return '00h 00min';

    const takeoff = this.currTicket.times.start;
    const landing = this.currTicket.times.end;
    const flightTime =
      (Date.parse('1990-12-12 ' + landing) - Date.parse('1990-12-12 ' + takeoff)) / 1000 / 60;

    return `${Math.floor(flightTime / 60)}h ${(flightTime % 60).toString().padStart(2, '0')}m`;
  }
}
