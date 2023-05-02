import { createAction, props } from '@ngrx/store';

export const SetPassengers = createAction(
  '[Passengers] Passengers Set',
  props<{ adult: number; child: number; infant: number }>()
);
