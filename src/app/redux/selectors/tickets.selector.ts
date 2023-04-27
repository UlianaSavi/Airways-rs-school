import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogState } from '..';

export const selectTickets = createSelector(
  createFeatureSelector<CatalogState>('catalog'),
  (tickets: CatalogState) => tickets.items
);
