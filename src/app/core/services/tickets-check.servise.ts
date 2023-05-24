import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketsCheckService {
  private sameTickets$$ = new Subject<boolean>();

  private badDatesSelect$$ = new Subject<boolean>();

  sameTickets$ = this.sameTickets$$.asObservable();

  badDatesSelect$ = this.badDatesSelect$$.asObservable();

  checkSameTickets(status: boolean) {
    this.sameTickets$$.next(status);
  }

  checkBadDatesSelect(status: boolean) {
    this.badDatesSelect$$.next(status);
  }
}
