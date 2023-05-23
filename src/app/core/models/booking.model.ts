import { PassengersType } from './passengers.model';

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
}
