import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { PassengersForm } from '../../models/passengers-form.model';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  formsData: ContactForm | PassengersForm | [] = [];

  constructor(private location: Location) {}

  back(): void {
    // TODO когда будет закончена выдача и выбор билетов, сюда будет поступать инфо о критериях поиска и какие билеты выбраны
    this.location.back();
  }

  addContactForm(contactForm: ContactForm) {
    console.log('contactForm', contactForm);
  }

  addPassengersForm(passengersForm: PassengersForm) {
    // TODO нужно как-то объеденить эти формы в один компонент и делать проверку, что валидны ВСЕ три формы
    console.log('passengersForm', passengersForm);
  }
}
