import { createReducer, on } from '@ngrx/store';
import * as PassengersActions from '../actions/passengers.actions';
import { PassengerData, PassengersType } from 'src/app/core/models/passengers.model';

export const passengersFeatureKey = 'passengers';

export type PassengersState = Record<PassengersType, PassengerData[]>;

const initialState: PassengersState = {
  adult: [],
  child: [],
  infant: [],
};

export const passengersReducer = createReducer(
  initialState,
  on(
    PassengersActions.SetDataPassengers,
    (state, { adult, child, infant }): PassengersState => ({
      ...state,
      adult,
      child,
      infant,
    })
  )
);
