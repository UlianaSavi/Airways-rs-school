import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SetAllTickets, SetOneWayTickets, TicketsActionsEnum } from '../actions/tickets.action';

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActionsEnum.getAllTickets),
      mergeMap(() =>
        this.dataService.getAllTickets().pipe(map((tickets) => new SetAllTickets(tickets)))
      ),
      ofType(TicketsActionsEnum.getOneWayTickets),
      mergeMap(() =>
        this.dataService.getOneWayTickets().pipe(map((tickets) => new SetOneWayTickets(tickets)))
      )
    );
  });

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
