import { createReducer, on } from '@ngrx/store';
import * as TicketsActions from '../actions/tickets.actions';
import { CatalogState } from '..';

export const initialState: CatalogState = {
  items: [],
};

export const ticketsReducers = createReducer(
  initialState,
  on(
    TicketsActions.SetAllTickets,
    (state, { tickets }): CatalogState => ({
      ...state,
      items: [...(state.items || []), ...tickets],
    })
  ),
  on(
    TicketsActions.ApiOneWayTicketsType,
    (state: CatalogState, tickets): CatalogState => ({ ...(state || []), ...tickets })
  )
);
