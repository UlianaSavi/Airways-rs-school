import { AgeStatus } from 'src/app/core/models/age-status.model';
import { ContactForm } from './contact-form.model';
import { PassengerData, PassengerDataExtended } from 'src/app/core/models/passengers.model';

export type FormsData = {
  passengersFrom?: PassengerData[] | null;
  contactForm?: ContactForm | null;
};

export type PassengersFormData = {
  id: string;
  cardHead: string;
  ageStatus: AgeStatus;
  addPassengersForm: (props: PassengerDataExtended) => void;
  setFormFullField: (props: { id: string; value: boolean }) => void;
};
