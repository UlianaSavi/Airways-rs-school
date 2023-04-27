import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SetAllTickets, TicketsActionsEnum } from '../actions/tickets.actions';

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActionsEnum.getAllTickets),
      switchMap(() =>
        this.dataService.getAllTickets().pipe(
          map((tickets) => {
            console.log('in EFFECT, tickets: ', tickets);
            return new SetAllTickets(tickets);
          })
        )
      )
      // ofType(TicketsActionsEnum.getOneWayTickets),
      // switchMap(() =>
      //   this.dataService.getOneWayTickets().pipe(map((tickets) => new SetOneWayTickets(tickets)))
      // )
    );
  });

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
