import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import {
  currencyDateFeatureKey,
  currencyDateReducer,
  CurrencyDateState,
} from './reducers/currency-date.reducer';
import { CatalogState, ticketsFeatureKey, ticketsReducer } from './reducers/tickets.reducer';

export interface State {
  [currencyDateFeatureKey]: CurrencyDateState;
  [ticketsFeatureKey]: CatalogState;
}

export const reducers: ActionReducerMap<State> = {
  [currencyDateFeatureKey]: currencyDateReducer,
  [ticketsFeatureKey]: ticketsReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
