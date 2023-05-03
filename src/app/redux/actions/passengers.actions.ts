import { createAction, props } from '@ngrx/store';
import { PassengerInfo } from 'src/app/search/models/passengers.model';

export const SetAllInfoPassengers = createAction(
  '[Passengers] Passengers Set',
  props<{ adult: PassengerInfo; child: PassengerInfo; infant: PassengerInfo }>()
);

export const SetCountPassengers = createAction(
  '[Passengers] Set Count Passengers',
  props<{
    adult: Pick<PassengerInfo, 'count'>;
    child: Pick<PassengerInfo, 'count'>;
    infant: Pick<PassengerInfo, 'count'>;
  }>()
);

export const SetDataPassengers = createAction(
  '[Passengers] Set Data Passengers',
  props<{
    adult: Pick<PassengerInfo, 'data'>;
    child: Pick<PassengerInfo, 'data'>;
    infant: Pick<PassengerInfo, 'data'>;
  }>()
);
