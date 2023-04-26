export interface ITicket {
  type: string;
  date: string | Date;
  price: string;
  times: {
    start: string;
    end: string;
  };
  counrty: {
    from: string;
    to: string;
  };
  flightNum: string;
  seats: number;
}
