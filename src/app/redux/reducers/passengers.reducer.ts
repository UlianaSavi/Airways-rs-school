import { createReducer, on } from '@ngrx/store';
import * as PassengersActions from '../actions/passengers.actions';
import {
  PassengerContacts,
  PassengerData,
  PassengersType,
} from 'src/app/core/models/passengers.model';

export const passengersFeatureKey = 'passengers';

export interface PassengersState {
  data: Record<PassengersType, PassengerData[]>;
  contacts: PassengerContacts;
}

const initialState: PassengersState = {
  data: {
    adult: [],
    child: [],
    infant: [],
  },
  contacts: {
    countryCode: '',
    phone: '',
    email: '',
  },
};

export const passengersReducer = createReducer(
  initialState,
  on(
    PassengersActions.SetDataPassengers,
    (state, { adult, child, infant, contacts }): PassengersState => ({
      ...state,
      data: {
        adult,
        child,
        infant,
      },
      contacts: contacts,
    })
  )
);
