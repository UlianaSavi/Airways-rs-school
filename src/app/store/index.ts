import { ITicket } from '../search/models/tickets.model';

export interface CatalogState {
  catalog: ITicket[];
}

export interface SearchState {
  query: string;
}
