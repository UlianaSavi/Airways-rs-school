import { createReducer, on } from '@ngrx/store';
import * as CurrencyDateActions from '../actions/currency-date.actions';

export const currencyDateFeatureKey = 'currencyDate';

export interface CurrencyDateState {
  formatDate: string;
  currency: { name: string; euroCoefficient: number };
}

export const initialState: CurrencyDateState = {
  formatDate: 'MM/DD/YYYY',
  currency: { name: 'EUR', euroCoefficient: 1 },
};

export const currencyDateReducer = createReducer(
  initialState,
  on(
    CurrencyDateActions.setDateFormat,
    (state, action): CurrencyDateState => ({
      ...state,
      formatDate: action.formatDate,
    })
  ),
  on(
    CurrencyDateActions.setCurrencyFormat,
    (state, action): CurrencyDateState => ({
      ...state,
      currency: { name: action.currency.name, euroCoefficient: action.currency.euroCoefficient },
    })
  )
);
