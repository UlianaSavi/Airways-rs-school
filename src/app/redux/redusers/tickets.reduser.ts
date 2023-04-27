import { TicketsActions, TicketsActionsEnum } from '../actions/tickets.actions';
import { CatalogState } from '../index';

export const TicketsReducers = (state: CatalogState['catalog'], action: TicketsActions) => {
  switch (action?.type) {
    case TicketsActionsEnum.setAllTickets: {
      return [...(state || []), ...action.payload];
    }
    case TicketsActionsEnum.setOneWayTickets: {
      return [...(state || []), ...action.payload];
    }
    default: {
      return state;
    }
  }
};
