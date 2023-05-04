import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import {
  currencyDateFeatureKey,
  currencyDateReducer,
  CurrencyDateState,
} from './reducers/currency-date.reducer';
import { CatalogState, ticketsFeatureKey, ticketsReducer } from './reducers/tickets.reducer';
import {
  SelectTicketsState,
  selectTicketFeatureKey,
  selectTicketReducer,
} from './reducers/select-ticket.reducer';
import {
  PassengersState,
  passengersFeatureKey,
  passengersReducer,
} from './reducers/passengers.reducer';

export interface State {
  [currencyDateFeatureKey]: CurrencyDateState;
  [ticketsFeatureKey]: CatalogState;
  [selectTicketFeatureKey]: SelectTicketsState;
  [passengersFeatureKey]: PassengersState;
}

export const reducers: ActionReducerMap<State> = {
  [currencyDateFeatureKey]: currencyDateReducer,
  [ticketsFeatureKey]: ticketsReducer,
  [selectTicketFeatureKey]: selectTicketReducer,
  [passengersFeatureKey]: passengersReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
