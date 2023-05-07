import { createAction, props } from '@ngrx/store';
import { ITicket } from 'src/app/search/models/tickets.model';

export const setSelectedTicket = createAction(
  '[SelectTicket] SelectTicket',
  props<{ ticket: ITicket | null }>()
);

export const setSelectedBackTicket = createAction(
  '[SelectTicket] SelectBackTicket',
  props<{ backTicket: ITicket | null }>()
);
