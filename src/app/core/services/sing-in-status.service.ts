import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingInStatusService {
  singInStatus$ = new Subject<boolean>();

  setSingInStatus(status: boolean): Observable<boolean> {
    this.singInStatus$.next(status);
    return this.singInStatus$.asObservable();
  }
}
