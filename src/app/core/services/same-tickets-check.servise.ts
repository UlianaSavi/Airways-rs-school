import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from 'src/app/search/models/tickets.model';

@Injectable({
  providedIn: 'root',
})
export class SameTicketsCheckService {
  constructor(private store: Store) {}

  ticketFrom: ITicket | null = null;

  ticketBack: ITicket | null = null;

  selectTicket$ = this.store.select(selectTicket);

  selectBackTicket$ = this.store.select(selectBackTicket);

  private sameTickets$$ = new Subject<boolean>();

  sameTickets$ = this.sameTickets$$.asObservable();

  checkSameTickets(status: boolean) {
    this.sameTickets$$.next(status);
  }
}
