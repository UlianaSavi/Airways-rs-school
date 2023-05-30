import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectTicketsState, selectTicketFeatureKey } from '../reducers/select-ticket.reducer';
import { ITicket } from 'src/app/search/models/tickets.model';

const selectTicketFeature = createFeatureSelector<SelectTicketsState>(selectTicketFeatureKey);

export const selectTicket = createSelector(
  selectTicketFeature,
  (state: SelectTicketsState): ITicket | null => state.ticket
);

export const selectBackTicket = createSelector(
  selectTicketFeature,
  (state: SelectTicketsState): ITicket | null => state.backTicket
);
