import { createAction, props } from '@ngrx/store';
import { ITicket, ITicketExtended } from 'src/app/search/models/tickets.model';

export const setSelectedTicket = createAction(
  '[SelectTicket] SelectTicket',
  props<{ ticket: ITicket | ITicketExtended | null }>()
);

export const setSelectedBackTicket = createAction(
  '[SelectTicket] SelectBackTicket',
  props<{ backTicket: ITicket | ITicketExtended | null }>()
);

export const resetSelectedTickets = createAction('[SelectTicket] Reset selected tickets');
