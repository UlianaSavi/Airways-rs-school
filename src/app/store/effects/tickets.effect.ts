import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { GetAllTickets, GetOneWayTickets, TicketsActionsEnum } from '../actions/tickets.action';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketsActionsEnum.getAllTickets),
      mergeMap(() =>
        this.dataService.getAllTickets().pipe(map((tickets) => new GetAllTickets(tickets)))
      ),
      ofType(TicketsActionsEnum.getOneWayTickets),
      mergeMap(() =>
        this.dataService.getOneWayTickets().pipe(map((tickets) => new GetOneWayTickets(tickets)))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private dataService: ApiService,
    private route: ActivatedRoute
  ) {}
}
