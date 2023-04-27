import { createAction, props } from '@ngrx/store';

export const setDateFormat = createAction(
  '[CurrencyDate] Set Date Format',
  props<{ formatDate: string }>()
);

export const setCurrencyFormat = createAction(
  '[CurrencyDate] Set Currency Format',
  props<{ currency: { name: string; euroCoefficient: number } }>()
);
