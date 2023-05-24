import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SameTicketsCheckService {
  private sameTickets$$ = new Subject<boolean>();

  sameTickets$ = this.sameTickets$$.asObservable();

  checkSameTickets(status: boolean) {
    this.sameTickets$$.next(status);
  }
}
