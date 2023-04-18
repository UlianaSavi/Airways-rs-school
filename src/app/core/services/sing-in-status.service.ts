import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingInStatusService {
  singInStatus$$ = new Subject<boolean>();

  singInStatus$ = this.singInStatus$$.asObservable();

  setSingInStatus(status: boolean) {
    this.singInStatus$$.next(status);
  }
}
