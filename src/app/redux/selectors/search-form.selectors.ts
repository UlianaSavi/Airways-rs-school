import { createFeatureSelector } from '@ngrx/store';
import { searchFormFeatureKey, SearchFormState } from '../reducers/search-form.reducer';

export const selectSearchFormFeature = createFeatureSelector<SearchFormState>(searchFormFeatureKey);
