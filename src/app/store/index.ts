import { ITicket } from '../search/models/tickets.model';

export interface CatalogState {
  catalog: ITicket[];
  query: string;
}
