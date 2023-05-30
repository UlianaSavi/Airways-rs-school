import { createAction, props } from '@ngrx/store';
import { ITicket } from 'src/app/search/models/tickets.model';

export const ApiTicketsType = createAction('[Search Page] getAllTickets');

export const ApiOneWayTicketsType = createAction(
  '[Search Page] getOneWayTickets',
  props<{ query: string }>()
);

export const SetAllTickets = createAction(
  '[Search Page] setAllTickets',
  props<{ tickets: ITicket[] }>()
);

export const SetOneWayTickets = createAction(
  '[Search Page] setOneWayTickets',
  props<{ tickets: ITicket[] }>()
);
