import { createReducer, on } from '@ngrx/store';
import * as PassengersActions from '../actions/passengers.actions';
import { PassengerInfo, PassengersType } from 'src/app/search/models/passengers.model';

export const passengersFeatureKey = 'passengers';

export type PassengersState = Record<PassengersType, PassengerInfo>;

const initialState: PassengersState = {
  adult: {
    count: 1,
    data: [],
  },
  child: {
    count: 0,
    data: [],
  },
  infant: {
    count: 0,
    data: [],
  },
};

export const passengersReducer = createReducer(
  initialState,
  on(
    PassengersActions.SetAllInfoPassengers,
    (state, { adult, child, infant }): PassengersState => ({
      ...state,
      adult,
      child,
      infant,
    })
  )
);
