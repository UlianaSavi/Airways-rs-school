import { ContactForm } from './contact-form.model';
import { PassengersForm } from './passengers-form.model';

export type FormsData = {
  passengersFrom?: PassengersForm | null;
  contactForm?: ContactForm | null;
};
