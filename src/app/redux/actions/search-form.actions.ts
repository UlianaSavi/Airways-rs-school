import { createAction, props } from '@ngrx/store';
import { SearchFormState } from '../reducers/search-form.reducer';

export const setSearchForms = createAction(
  '[SearchForm] Set SearchForms',
  props<{ searchForm: SearchFormState }>()
);
