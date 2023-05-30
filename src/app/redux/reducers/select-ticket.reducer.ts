import { createReducer, on } from '@ngrx/store';
import * as SelectTicketActions from '../actions/select-ticket.actions';
import { ITicket, ITicketExtended } from 'src/app/search/models/tickets.model';

export const selectTicketFeatureKey = 'selectTicket';

export interface SelectTicketsState {
  ticket: ITicket | ITicketExtended | null;
  backTicket: ITicket | ITicketExtended | null;
}

export const initialState: SelectTicketsState = {
  ticket: null,
  backTicket: null,
};

export const selectTicketReducer = createReducer(
  initialState,
  on(
    SelectTicketActions.setSelectedTicket,
    (state, { ticket }): SelectTicketsState => ({
      ...state,
      ticket,
    })
  ),
  on(
    SelectTicketActions.setSelectedBackTicket,
    (state, { backTicket }): SelectTicketsState => ({
      ...state,
      backTicket,
    })
  ),
  on(
    SelectTicketActions.resetSelectedTickets,
    (state): SelectTicketsState => ({
      ...state,
      ticket: null,
      backTicket: null,
    })
  )
);
