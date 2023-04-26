import { TicketsActions, TicketsActionsEnum } from '../actions/tickets.action';
import { CatalogState } from '../index';

export const TicketsReducers = (state: CatalogState['catalog'], action: TicketsActions) => {
  switch (action?.type) {
    case TicketsActionsEnum.getAllTickets: {
      return { tickets: [...state, action.payload] };
    }
    case TicketsActionsEnum.getOneWayTickets: {
      return { tickets: [...state, action.payload] };
    }
    default: {
      return state;
    }
  }
};
