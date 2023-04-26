import { ITicket } from './models/tickets.model';

export const tickets: ITicket[] = [
  {
    type: 'from',
    date: new Date(2023, 5, 7),
    price: '€200',
    times: {
      start: '12:00',
      end: '14:00',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR125',
    seats: 45,
  },
  {
    type: 'from',
    date: new Date(2023, 5, 8),
    price: '€120',
    times: {
      start: '17:00',
      end: '19:00',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR126',
    seats: 23,
  },
  {
    type: 'from',
    date: new Date(2023, 5, 9),
    price: '€190',
    times: {
      start: '16:10',
      end: '18:35',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR127',
    seats: 100,
  },
  {
    type: 'from',
    date: new Date(2023, 5, 10),
    price: '€126',
    times: {
      start: '13:20',
      end: '15:40',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR128',
    seats: 48,
  },
  {
    type: 'from',
    date: new Date(2023, 5, 11),
    price: '€180',
    times: {
      start: '9:20',
      end: '11:20',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR129',
    seats: 94,
  },
  {
    type: 'back',
    date: new Date(2023, 5, 18),
    price: '€140',
    times: {
      start: '10:20',
      end: '12:20',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR125',
    seats: 55,
  },
  {
    type: 'back',
    date: new Date(2023, 5, 19),
    price: '€152',
    times: {
      start: '5:20',
      end: '7:10',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR126',
    seats: 11,
  },
  {
    type: 'back',
    date: new Date(2023, 5, 20),
    price: '€210',
    times: {
      start: '13:00',
      end: '15:15',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR127',
    seats: 78,
  },
  {
    type: 'back',
    date: new Date(2023, 5, 21),
    price: '€130',
    times: {
      start: '19:45',
      end: '21:40',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR128',
    seats: 100,
  },
  {
    type: 'back',
    date: new Date(2023, 5, 22),
    price: '€170',
    times: {
      start: '13:00',
      end: '15:15',
    },
    counrty: {
      from: 'Moscow',
      to: 'Dublin',
    },
    flightNum: 'FR129',
    seats: 23,
  },
];
