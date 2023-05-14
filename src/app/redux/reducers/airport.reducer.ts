import { createReducer, on } from '@ngrx/store';
import * as AirportActions from '../actions/airport.actions';
import { Airport } from 'src/app/core/models/airport.model';

export const airportFeatureKey = 'airport';

export interface AirportState {
  searchKeyAirport: string;
  airports: Airport[];
  fromAirport: Airport | null;
  toAirport: Airport | null;
}

export const initialState: AirportState = {
  searchKeyAirport: '',
  airports: [],
  fromAirport: null,
  toAirport: null,
};

export const airportReducer = createReducer(
  initialState,
  on(
    AirportActions.setSearchKeyAirport,
    (state, { searchKeyAirport }): AirportState => ({
      ...state,
      searchKeyAirport,
    })
  ),
  on(
    AirportActions.setAirports,
    (state, { airports }): AirportState => ({
      ...state,
      airports,
    })
  ),
  on(
    AirportActions.setFromAirport,
    (state, { fromAirport }): AirportState => ({
      ...state,
      fromAirport,
    })
  ),
  on(
    AirportActions.seTotAirport,
    (state, { toAirport }): AirportState => ({
      ...state,
      toAirport,
    })
  ),
  on(
    AirportActions.resetAirportStore,
    (state): AirportState => ({
      ...state,
      searchKeyAirport: '',
      airports: [],
    })
  ),
  on(
    AirportActions.changeFromAirportTooAirport,
    (state): AirportState => ({
      ...state,
      fromAirport: state.toAirport,
      toAirport: state.fromAirport,
    })
  )
);
