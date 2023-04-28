import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogState, ticketsFeatureKey } from '../reducers/tickets.reducer';

export const selectTickets = createSelector(
  createFeatureSelector<CatalogState>(ticketsFeatureKey),
  (tickets: CatalogState) => tickets.items
);
