export type PassengersType = 'adult' | 'child' | 'infant';

export type PassengerData = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBird: string;
  baggage: boolean;
  baggageCount: number;
};

export type PassengerInfo = {
  count: number;
  data: PassengerData[];
};
