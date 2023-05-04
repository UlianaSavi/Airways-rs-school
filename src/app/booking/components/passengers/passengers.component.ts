import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { PassengersFormData } from '../../models/forms.model';
import { CONTACT_FROM_ID } from 'src/app/shared/constants/contact-form';
import { PassengerData } from 'src/app/core/models/passengers.model';
import { Store } from '@ngrx/store';
import { selectCountPassengers } from '../../../redux/selectors/passengers.selectors';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent implements OnInit {
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

  passengersForm: PassengerData | [] = [];

  contactForm: ContactForm | [] = [];

  canContinue = false;

  constructor(private location: Location, private store: Store) {
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

  addPassengersForm(passengersForm: PassengerData) {
    this.passengersForm = passengersForm;
  }

  addContactForm(contactForm: ContactForm) {
    this.contactForm = contactForm;
  }

  setFormFullField(props: { id: string; value: boolean }) {
    const updatedStatus = [...this.formsStatus];
    const formIndex = this.formsStatus.findIndex(({ id }) => id === props?.id);

    if (formIndex !== -1) {
      updatedStatus[formIndex].value = props.value;
    }

    this.formsStatus = updatedStatus;

    if (this.formsStatus.map((form) => form.value).every((is) => is)) {
      this.canContinue = true;
    }
  }

  peopleCount$ = this.store.select(selectCountPassengers);

  ngOnInit(): void {
    this.peopleCount$.subscribe((count) => {
      this.passengersFormsData = this.setPeopleArray(count.adult, count.child, count.infant);
    });
  }

  private setPeopleArray(
    adultCount: number,
    childCount: number,
    infantCount: number
  ): PassengersFormData[] {
    const result: PassengersFormData[] = [];
    let count = 1;

    for (let i = 0; i < adultCount; i++) {
      result.push({
        id: count.toString(),
        cardHead: `${count}. Adult`,
        ageStatus: 'Adult',
        addPassengersForm: this.addPassengersForm.bind(this),
        setFormFullField: this.setFormFullField.bind(this),
      });
      count += 1;
    }

    for (let i = 0; i < childCount; i++) {
      result.push({
        id: count.toString(),
        cardHead: `${count}. Child`,
        ageStatus: 'Children',
        addPassengersForm: this.addPassengersForm.bind(this),
        setFormFullField: this.setFormFullField.bind(this),
      });
      count += 1;
    }

    for (let i = 0; i < infantCount; i++) {
      result.push({
        id: count.toString(),
        cardHead: `${count}. Infant`,
        ageStatus: 'Infant',
        addPassengersForm: this.addPassengersForm.bind(this),
        setFormFullField: this.setFormFullField.bind(this),
      });
      count += 1;
    }

    return result;
  }
}
