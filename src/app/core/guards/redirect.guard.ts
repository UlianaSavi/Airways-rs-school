import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IQueryParams } from '../models/query-params.model';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    const queryParams: IQueryParams = JSON.parse(localStorage.getItem('query') || '0');
    if (!this.router.navigated && queryParams) {
      return this.router.createUrlTree(['search', 'results'], { queryParams });
    } else if (!this.router.navigated && !queryParams) {
      return this.router.createUrlTree(['search']);
    }
    return true;
  };
}
