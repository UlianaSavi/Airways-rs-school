import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AirportState, airportFeatureKey } from '../reducers/airport.reducer';
import { Airport } from 'src/app/core/models/airport.model';

const selectAirportFeature = createFeatureSelector<AirportState>(airportFeatureKey);

export const selectSearchKeyAirport = createSelector(
  selectAirportFeature,
  (state: AirportState): string => state.searchKeyAirport
);

export const selectAirports = createSelector(
  selectAirportFeature,
  (state: AirportState): Airport[] => state.airports
);

export const selectFromAirport = createSelector(
  selectAirportFeature,
  (state: AirportState): Airport | null => state.fromAirport
);

export const selectToAirport = createSelector(
  selectAirportFeature,
  (state: AirportState): Airport | null => state.toAirport
);
