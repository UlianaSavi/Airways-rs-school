import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PassengersState, passengersFeatureKey } from '../reducers/passengers.reducer';
import {
  PassengerData,
  PassengerInfo,
  PassengersType,
} from 'src/app/core/models/passengers.model';

const selectPassengersFeature = createFeatureSelector<PassengersState>(passengersFeatureKey);

export const selectPassengers = createSelector(
  selectPassengersFeature,
  (state: PassengersState): Record<PassengersType, PassengerInfo> => state
);

export const selectCountPassengers = createSelector(
  selectPassengersFeature,
  (state: PassengersState): Record<PassengersType, number> => ({
    adult: state.adult.count,
    child: state.child.count,
    infant: state.infant.count,
  })
);

export const selectDataPassengers = createSelector(
  selectPassengersFeature,
  (state: PassengersState): Record<PassengersType, PassengerData[]> => ({
    adult: state.adult.data,
    child: state.child.data,
    infant: state.infant.data,
  })
);
