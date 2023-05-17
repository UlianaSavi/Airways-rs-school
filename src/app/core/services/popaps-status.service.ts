import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopapsStatusService {
  singInStatus$$ = new Subject<boolean>();

  singInStatus$ = this.singInStatus$$.asObservable();

  paymentStatus$$ = new Subject<boolean>();

  paymentStatus$ = this.paymentStatus$$.asObservable();

  setSingInStatus(status: boolean) {
    this.singInStatus$$.next(status);
  }

  setPaymentStatus(status: boolean) {
    this.paymentStatus$$.next(status);
  }
}
