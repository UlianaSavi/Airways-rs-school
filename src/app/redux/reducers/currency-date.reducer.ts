import { createReducer, on } from '@ngrx/store';
import * as CurrencyDateActions from '../actions/currency-date.actions';

export const currencyDateFeatureKey = 'currencyDate';

export interface CurrencyDateState {
  formatDate: string;
  currency: string;
}

export const initialState: CurrencyDateState = {
  formatDate: 'MM/DD/YYYY',
  currency: 'EUR',
};

export const currencyDateReducer = createReducer(
  initialState,
  on(
    CurrencyDateActions.setCurrencyDates,
    (state, action): CurrencyDateState => ({
      ...state,
      formatDate: action.formatDate,
      currency: action.currency,
    })
  )
);
