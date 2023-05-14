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
import {
  searchFormFeatureKey,
  searchFormReducer,
  SearchFormState,
} from './reducers/search-form.reducer';
import { AirportState, airportFeatureKey, airportReducer } from './reducers/airport.reducer';

export interface State {
  [currencyDateFeatureKey]: CurrencyDateState;
  [searchFormFeatureKey]: SearchFormState;
  [ticketsFeatureKey]: CatalogState;
  [selectTicketFeatureKey]: SelectTicketsState;
  [passengersFeatureKey]: PassengersState;
  [airportFeatureKey]: AirportState;
}

export const reducers: ActionReducerMap<State> = {
  [currencyDateFeatureKey]: currencyDateReducer,
  [searchFormFeatureKey]: searchFormReducer,
  [ticketsFeatureKey]: ticketsReducer,
  [selectTicketFeatureKey]: selectTicketReducer,
  [passengersFeatureKey]: passengersReducer,
  [airportFeatureKey]: airportReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
