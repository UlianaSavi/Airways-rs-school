import { createReducer, on } from '@ngrx/store';
import * as SelectTicketActions from '../actions/select-ticket.actions';
import { ITicket } from 'src/app/search/models/tickets.model';

export const selectTicketFeatureKey = 'selectTicket';

export interface SelectTicketsState {
  ticket: ITicket | null;
  backTicket: ITicket | null;
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
  )
);
