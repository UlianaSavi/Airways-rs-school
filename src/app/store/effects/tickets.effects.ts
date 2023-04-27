import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import {
  ApiOneWayTicketsType,
  SetAllTickets,
  SetOneWayTickets,
  TicketsActionsEnum,
} from '../actions/tickets.actions';

@Injectable()
export class TicketsEffects {
  loadAllTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActionsEnum.getAllTickets),
      switchMap(() =>
        this.dataService.getAllTickets().pipe(
          map((tickets) => {
            return new SetAllTickets(tickets);
          })
        )
      )
    );
  });

  loadOneWayTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActionsEnum.getOneWayTickets),
      switchMap((action: ApiOneWayTicketsType) =>
        this.dataService
          .getOneWayTickets(action.payload)
          .pipe(map((tickets) => new SetOneWayTickets(tickets)))
      )
    );
  });

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
