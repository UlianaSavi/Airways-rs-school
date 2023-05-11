export type PassengersType = 'adult' | 'child' | 'infant';

export type PassengerData = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBird: string;
  baggage: boolean;
  baggageCount: number;
};

export type PassengerDataExtended = PassengerData & {
  id: string;
  ageStatus: string;
};

export type PassengerContacts = {
  countryCode: string;
  phone: string;
  email: string;
};
