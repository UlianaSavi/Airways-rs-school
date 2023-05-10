import { createReducer, on } from '@ngrx/store';
import * as SearchFormActions from '../actions/search-form.actions';
import { PassengersType } from '../../core/models/passengers.model';

export const searchFormFeatureKey = 'searchForm';

export type FlightTypes = 'one' | 'round';

export interface SearchFormState {
  typeOfFlight: FlightTypes;
  from: string;
  destination: string;
  dateFrom: string;
  dateDestination: string | null;
  passengersCount: Record<PassengersType, number>;
}

export const initialState: SearchFormState = {
  typeOfFlight: 'round',
  from: '',
  destination: '',
  dateFrom: '',
  dateDestination: null,
  passengersCount: { adult: 1, child: 0, infant: 0 },
};

export const searchFormReducer = createReducer(
  initialState,
  on(SearchFormActions.setSearchForms, (state, action): SearchFormState => action.searchForm)
);
