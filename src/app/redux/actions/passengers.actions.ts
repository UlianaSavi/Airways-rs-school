import { createAction, props } from '@ngrx/store';
import { PassengerInfo } from 'src/app/search/models/passengers.model';

export const SetPassengers = createAction(
  '[Passengers] Passengers Set',
  props<{ adult: PassengerInfo; child: PassengerInfo; infant: PassengerInfo }>()
);
