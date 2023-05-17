import { PassengersType } from './passengers.model';

type CartTicket = {
  date: string;
  times: {
    start: string;
    end: string;
  };
  flightNum: string;
};

export interface Cart {
  id: number;
  select: boolean;
  city: {
    from: string;
    to: string;
  };
  ticket: CartTicket;
  backTicket?: CartTicket;
  passengers: Record<PassengersType, number>;
  price: number;
}
