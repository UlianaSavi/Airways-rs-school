import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupsStatusService {
  private singInStatus$$ = new Subject<boolean>();

  singInStatus$ = this.singInStatus$$.asObservable();

  private paymentStatus$$ = new Subject<boolean>();

  paymentStatus$ = this.paymentStatus$$.asObservable();

  private passwordHelperStatus$$ = new Subject<boolean>();

  passwordHelperStatus$ = this.passwordHelperStatus$$.asObservable();

  setSingInStatus(status: boolean) {
    this.singInStatus$$.next(status);
  }

  setPaymentStatus(status: boolean) {
    this.paymentStatus$$.next(status);
  }

  setPasswordHelper(status: boolean) {
    this.passwordHelperStatus$$.next(status);
  }
}
