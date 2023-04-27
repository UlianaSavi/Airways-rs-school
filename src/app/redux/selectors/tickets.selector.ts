import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogState } from '..';
import { ITicket } from 'src/app/search/models/tickets.model';

export const getTicketsFeatureKey = 'get Tickets';

export const selectTicketsFeature = createFeatureSelector<CatalogState>(getTicketsFeatureKey);

export const selectTickets = createSelector(
  selectTicketsFeature,
  (state: CatalogState): ITicket[] => state.catalog
);
