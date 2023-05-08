import { createReducer, on } from '@ngrx/store';
import * as SelectTicketActions from '../actions/select-ticket.actions';
import { ITicket } from 'src/app/search/models/tickets.model';

export const selectTicketFeatureKey = 'selectTicket';

export interface SelectTicketsState {
  ticket: ITicket | null;
  backTicket: ITicket | null;
  selected: boolean;
}

export const initialState: SelectTicketsState = {
  ticket: null,
  backTicket: null,
  selected: false,
};

export const selectTicketReducer = createReducer(
  initialState,
  on(
    SelectTicketActions.SelectTicket,
    (state, { ticket }): SelectTicketsState => ({
      ...state,
      ticket,
    })
  ),
  on(
    SelectTicketActions.SelectBackTicket,
    (state, { backTicket }): SelectTicketsState => ({
      ...state,
      backTicket,
    })
  )
);
