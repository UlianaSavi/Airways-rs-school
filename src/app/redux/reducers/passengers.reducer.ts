import { createReducer, on } from '@ngrx/store';
import * as PassengersActions from '../actions/passengers.actions';
import { PassengerInfo, PassengersType } from 'src/app/core/models/passengers.model';

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
  ),
  on(
    PassengersActions.SetCountPassengers,
    (state, action): PassengersState => ({
      ...state,
      adult: { count: action.adult.count, data: state.adult.data },
      child: { count: action.child.count, data: state.child.data },
      infant: { count: action.infant.count, data: state.infant.data },
    })
  ),
  on(
    PassengersActions.SetDataPassengers,
    (state, action): PassengersState => ({
      ...state,
      adult: { count: state.adult.count, data: action.adult.data },
      child: { count: state.child.count, data: action.adult.data },
      infant: { count: state.infant.count, data: action.adult.data },
    })
  )
);
