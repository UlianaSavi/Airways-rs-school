import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { PassengersForm } from '../../models/passengers-form.model';
import { PassengersFormData } from '../../models/forms.model';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  passangersFormsData: PassengersFormData[] = [
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

  constructor(private location: Location) {
    this.formsStatus = this.passangersFormsData.map(({ id }) => ({ id, value: false }));
  }

  back(): void {
    // TODO когда будет закончена выдача и выбор билетов, сюда будет поступать инфо о критериях поиска и какие билеты выбраны
    this.location.back();
  }

  addPassengersForm(passengersForm: PassengersForm) {
    this.passengersForm = passengersForm;
  }

  setFormFullField(props: { id: string; value: boolean }) {
    const updatedStatus = [...this.formsStatus];
    const formIndex = this.formsStatus.findIndex(({ id }) => id === props?.id);

    if (formIndex !== -1) {
      updatedStatus[formIndex].value = props.value;
    }

    this.formsStatus = updatedStatus;
    console.log(this.formsStatus.map((form) => form.value).every((is) => is));
  }

  addContactForm(contactForm: ContactForm) {
    this.contactForm = contactForm;
  }
}
