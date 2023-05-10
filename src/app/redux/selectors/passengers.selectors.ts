import { createFeatureSelector } from '@ngrx/store';
import { PassengersState, passengersFeatureKey } from '../reducers/passengers.reducer';

export const selectPassengersDataFeature =
  createFeatureSelector<PassengersState>(passengersFeatureKey);
