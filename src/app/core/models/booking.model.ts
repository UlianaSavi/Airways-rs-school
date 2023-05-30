import { PassengersType } from './passengers.model';
import { ITicketExtended } from '../../search/models/tickets.model';
import { PassengersState } from '../../redux/reducers/passengers.reducer';

type BookingFlight = {
  date: string;
  times: {
    start: string;
    end: string;
  };
  flightNum: string;
};

export interface Booking {
  id: string;
  city: {
    from: string;
    to: string;
  };
  ticket: BookingFlight;
  backTicket?: BookingFlight;
  passengers: Record<PassengersType, number>;
  price: number;
  ticketsInfo: {
    ticket: ITicketExtended;
    backTicket: ITicketExtended | null;
  };
  passengersData: PassengersState;
}
