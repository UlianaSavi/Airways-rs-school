import { Component, Input, OnInit } from '@angular/core';
import { ITicket, ITicketExtended } from '../../models/tickets.model';
import { Store } from '@ngrx/store';
import {
  setSelectedBackTicket,
  setSelectedTicket,
} from 'src/app/redux/actions/select-ticket.actions';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { selectCurrencyFormat } from 'src/app/redux/selectors/currency-date.selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() currTicket: ITicket | ITicketExtended | null = null;

  @Input() isBack = false;

  isSelected = false;

  currentCurrency$ = this.store.select(selectCurrencyFormat);

  constructor(private store: Store) {}

  ngOnInit(): void {
    (this.isBack ? this.store.select(selectBackTicket) : this.store.select(selectTicket)).subscribe(
      (ticket) => (this.isSelected = !!ticket)
    );
  }

  public getDuration(): string {
    if (!this.currTicket) return '00h 00min';

    const takeoff = this.currTicket.times.start;
    const landing = this.currTicket.times.end;
    const flightTime =
      (Date.parse('1990-12-12 ' + landing) - Date.parse('1990-12-12 ' + takeoff)) / 1000 / 60;

    return `${Math.floor(flightTime / 60)}h ${(flightTime % 60).toString().padStart(2, '0')}m`;
  }

  public selectTicket() {
    if (this.isBack) this.store.dispatch(setSelectedBackTicket({ backTicket: this.currTicket }));
    else this.store.dispatch(setSelectedTicket({ ticket: this.currTicket }));
  }

  public editTicket() {
    if (this.isBack) this.store.dispatch(setSelectedBackTicket({ backTicket: null }));
    else this.store.dispatch(setSelectedTicket({ ticket: null }));
  }
}
