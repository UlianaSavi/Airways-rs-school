import { createAction, props } from '@ngrx/store';
import { Airport } from 'src/app/core/models/airport.model';

export const setSearchKeyAirport = createAction(
  '[Airport] Search key airport',
  props<{ searchKeyAirport: string }>()
);

export const setAirports = createAction(
  '[Airport] Set airports data',
  props<{ airports: Airport[] }>()
);

export const setFromAirport = createAction(
  '[Airport] Set airport from',
  props<{ fromAirport: Airport }>()
);

export const seTotAirport = createAction(
  '[Airport] Set airport to',
  props<{ toAirport: Airport }>()
);

export const resetAirportStore = createAction('[Airport] Airport store reset');

export const changeFromAirportTooAirport = createAction(
  '[Airport] Change fromAirport to toAirport'
);
