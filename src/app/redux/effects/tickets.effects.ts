import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ApiTicketsType, SetAllTickets } from '../actions/tickets.actions';

@Injectable()
export class TicketsEffects {
  loadAllTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiTicketsType),
      switchMap(() =>
        this.dataService.getAllTickets().pipe(
          map((tickets) => {
            return SetAllTickets({ tickets });
          })
        )
      )
    );
  });

  // loadOneWayTickets$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ApiOneWayTicketsType),
  //     switchMap((action = ApiOneWayTicketsType.props.query) =>
  //       this.dataService
  //         .getOneWayTickets(action.query)
  //         .pipe(map((tickets) => SetOneWayTickets({ tickets })))
  //     )
  //   );
  // });

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
