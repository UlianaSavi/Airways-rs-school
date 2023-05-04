export interface ITicket {
  type: string;
  date: Date;
  price: number;
  times: {
    start: string;
    end: string;
  };
  country: {
    from: string;
    to: string;
  };
  flightNum: string;
  seats: number;
}
