import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { PassengersForm } from '../../models/passengers-form.model';
import { FormsData } from '../../models/forms.model';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  formsData: FormsData | [] = []; // TODO объеденить значения с форм в одну

  passengersForm: PassengersForm | [] = [];

  contactForm: ContactForm | [] = [];

  constructor(private location: Location) {}

  back(): void {
    // TODO когда будет закончена выдача и выбор билетов, сюда будет поступать инфо о критериях поиска и какие билеты выбраны
    this.location.back();
  }

  addPassengersForm(passengersForm: PassengersForm) {
    this.passengersForm = passengersForm;
  }

  addContactForm(contactForm: ContactForm) {
    this.contactForm = contactForm;
  }
}
