import { AgeStatus } from 'src/app/core/models/age-status.model';
import { ContactForm } from './contact-form.model';
import { PassengersForm } from './passengers-form.model';

export type FormsData = {
  passengersFrom?: PassengersForm[] | null;
  contactForm?: ContactForm | null;
};

export type PassengersFormData = {
  id: string;
  cardHead: string;
  ageStatus: AgeStatus;
  addPassengersForm: (props: PassengersForm) => void;
  setFormFullField: (props: { id: string; value: boolean }) => void;
};
