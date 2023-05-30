import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class SingleBuyService {
  private _ticket = new BehaviorSubject<Booking | null>(null);

  ticket$ = this._ticket.asObservable();

  setTicket(ticket: Booking) {
    this._ticket.next(ticket);
  }

  setTicketNull() {
    this._ticket.next(null);
  }
}
