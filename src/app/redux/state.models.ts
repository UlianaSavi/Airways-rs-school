import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import {
  currencyDateFeatureKey,
  currencyDateReducer,
  CurrencyDateState,
} from './reducers/currency-date.reducer';

export interface State {
  [currencyDateFeatureKey]: CurrencyDateState;
}

export const reducers: ActionReducerMap<State> = {
  [currencyDateFeatureKey]: currencyDateReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
