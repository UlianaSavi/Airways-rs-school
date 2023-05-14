import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AirportActions from '../actions/airport.actions';
import { map, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ApiEffects {
  public getAirports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AirportActions.setSearchKeyAirport),
      mergeMap((action) => {
        return this.apiService
          .getAirports(action.searchKeyAirport)
          .pipe(map((airports) => AirportActions.setAirports({ airports: airports })));
      })
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
