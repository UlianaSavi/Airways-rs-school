import { createAction, props } from '@ngrx/store';

export const setCurrencyDates = createAction(
  '[CurrencyDate] Set CurrencyDates',
  props<{ formatDate: string; currency: string }>()
);
