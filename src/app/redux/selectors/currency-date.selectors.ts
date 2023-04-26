import { createFeatureSelector, createSelector } from '@ngrx/store';
import { currencyDateFeatureKey, CurrencyDateState } from '../reducers/currency-date.reducer';

export const selectCurrencyDateFeature =
  createFeatureSelector<CurrencyDateState>(currencyDateFeatureKey);

export const selectCurrencyDate = createSelector(
  selectCurrencyDateFeature,
  (state: CurrencyDateState): CurrencyDateState => state
);
