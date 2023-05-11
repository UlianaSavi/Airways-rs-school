import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PassengersState, passengersFeatureKey } from '../reducers/passengers.reducer';
import {
  PassengerContacts,
  PassengerData,
  PassengersType,
} from '../../core/models/passengers.model';

export const selectPassengersDataFeature =
  createFeatureSelector<PassengersState>(passengersFeatureKey);

export const selectPassengersData = createSelector(
  selectPassengersDataFeature,
  (state: PassengersState): Record<PassengersType, PassengerData[]> => state.data
);

export const selectPassengersContacts = createSelector(
  selectPassengersDataFeature,
  (state: PassengersState): PassengerContacts => state.contacts
);
