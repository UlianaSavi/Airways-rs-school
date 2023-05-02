import { createReducer, on } from '@ngrx/store';
import * as PassengersActions from '../actions/passengers.actions';
import { PassengersType } from 'src/app/search/models/passengers.model';

export const passengersFeatureKey = 'passengers';

export type PassengersState = Record<PassengersType, number>;

export const initialState: PassengersState = {
  adult: 1,
  child: 0,
  infant: 0,
};

export const passengersReducer = createReducer(
  initialState,
  on(
    PassengersActions.SetPassengers,
    (state, { adult, child, infant }): PassengersState => ({
      ...state,
      adult,
      child,
      infant,
    })
  )
);
