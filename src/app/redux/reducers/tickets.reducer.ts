import { createReducer, on } from '@ngrx/store';
import * as TicketsActions from '../actions/tickets.actions';
import { ITicket } from '../../search/models/tickets.model';

export const ticketsFeatureKey = 'catalogTickets';

export interface CatalogState {
  items: ITicket[] | [];
}

export const initialState: CatalogState = {
  items: [],
};

export const ticketsReducer = createReducer(
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
