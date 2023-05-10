import { createAction, props } from '@ngrx/store';
import { PassengerData } from 'src/app/core/models/passengers.model';

export const SetDataPassengers = createAction(
  '[Passengers] PassengersData Set',
  props<{ adult: PassengerData[]; child: PassengerData[]; infant: PassengerData[] }>()
);
