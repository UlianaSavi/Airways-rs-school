import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { PassengersForm } from '../../models/passengers-form.model';
import { PassengersFormData } from '../../models/forms.model';
import { CONTACT_FROM_ID } from 'src/app/shared/constants/contact-form';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  passengersFormsData: PassengersFormData[] = [
    {
      id: '1',
      cardHead: '1. Adult',
      ageStatus: 'Adult',
      addPassengersForm: this.addPassengersForm.bind(this),
      setFormFullField: this.setFormFullField.bind(this),
    },
    {
      id: '2',
      cardHead: '2. Child',
      ageStatus: 'Children',
      addPassengersForm: this.addPassengersForm.bind(this),
      setFormFullField: this.setFormFullField.bind(this),
    },
    {
      id: '3',
      cardHead: '3. Infant',
      ageStatus: 'Infant',
      addPassengersForm: this.addPassengersForm.bind(this),
      setFormFullField: this.setFormFullField.bind(this),
    },
  ];

  formsStatus: { id: string; value: boolean }[] = [];

  passengersForm: PassengersForm | [] = [];

  contactForm: ContactForm | [] = [];

  canContinue = false;

  constructor(private location: Location) {
    this.formsStatus = [
      ...this.passengersFormsData.map(({ id }) => ({ id, value: false })),
      {
        id: CONTACT_FROM_ID,
        value: false,
      },
    ];
  }

  back(): void {
    this.location.back();
  }

  addPassengersForm(passengersForm: PassengersForm) {
    this.passengersForm = passengersForm;
    console.log('passengers form', this.passengersForm);
  }

  addContactForm(contactForm: ContactForm) {
    this.contactForm = contactForm;
    console.log('contact form', this.contactForm);
  }

  setFormFullField(props: { id: string; value: boolean }) {
    const updatedStatus = [...this.formsStatus];
    const formIndex = this.formsStatus.findIndex(({ id }) => id === props?.id);

    if (formIndex !== -1) {
      updatedStatus[formIndex].value = props.value;
    }

    this.formsStatus = updatedStatus;
    console.log(
      'All forms is valid: ',
      this.formsStatus.map((form) => form.value).every((is) => is)
    );
    if (this.formsStatus.map((form) => form.value).every((is) => is)) {
      this.canContinue = true;
    }
  }
}
