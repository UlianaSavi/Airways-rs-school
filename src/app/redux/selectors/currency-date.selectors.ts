import { createFeatureSelector, createSelector } from '@ngrx/store';
import { currencyDateFeatureKey, CurrencyDateState } from '../reducers/currency-date.reducer';

export const selectCurrencyDateFeature =
  createFeatureSelector<CurrencyDateState>(currencyDateFeatureKey);

export const selectDateCurrency = createSelector(
  selectCurrencyDateFeature,
  (state: CurrencyDateState): CurrencyDateState => state
);

export const selectDateFormat = createSelector(
  selectCurrencyDateFeature,
  (state: CurrencyDateState): string => state.formatDate
);

export const selectCurrencyFormat = createSelector(
  selectCurrencyDateFeature,
  (state: CurrencyDateState): { name: string; euroCoefficient: number } => state.currency
);
