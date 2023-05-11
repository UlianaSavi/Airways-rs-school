import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import * as TicketsActions from '../actions/tickets.actions';

@Injectable()
export class AppEffects {
  loadAllTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActions.ApiTicketsType),
      switchMap(() =>
        this.dataService
          .getAllTickets()
          .pipe(map((tickets) => TicketsActions.SetAllTickets({ tickets })))
      )
    );
  });

  loadOneWayTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActions.ApiOneWayTicketsType),
      switchMap((action) =>
        this.dataService
          .getOneWayTickets(action.query)
          .pipe(map((tickets) => TicketsActions.SetOneWayTickets({ tickets })))
      )
    );
  });

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
