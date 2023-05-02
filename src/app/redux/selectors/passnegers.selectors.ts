import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PassengersState, passengersFeatureKey } from '../reducers/passengers.reducer';
import { PassengersType } from 'src/app/search/models/passengers.model';

const selectPassengersFeature = createFeatureSelector<PassengersState>(passengersFeatureKey);

export const selectPassengers = createSelector(
  selectPassengersFeature,
  (state: PassengersState): Record<PassengersType, number> => state
);
