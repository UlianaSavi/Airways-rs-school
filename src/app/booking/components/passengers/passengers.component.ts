import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { PassengersFormData } from '../../models/forms.model';
import { CONTACT_FROM_ID } from 'src/app/shared/constants/contact-form';
import { PassengerData, PassengerDataExtended } from 'src/app/core/models/passengers.model';
import { Store } from '@ngrx/store';
import { selectSearchFormFeature } from '../../../redux/selectors/search-form.selectors';
import * as PassengersActions from '../../../redux/actions/passengers.actions';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  passengersFormsData: PassengersFormData[] = [];

  formsStatus: { id: string; value: boolean }[] = [];

  contactForm: ContactForm = {
    id: 'CONTACT_FROM_ID',
    phone: '',
    countryCode: '',
    email: '',
  };

  canContinue = false;

  constructor(private location: Location, private store: Store) {
    this.searchForm$.subscribe((form) => {
      this.passengersFormsData = this.setPeopleArray(
        form.passengersCount.adult,
        form.passengersCount.child,
        form.passengersCount.infant
      );
    });
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

  passengersForm: { [id: string]: PassengerDataExtended } = {};

  adultsData: PassengerData[] = [];

  childrenData: PassengerData[] = [];

  infantsData: PassengerData[] = [];

  addPassengersForm(passengersForm: PassengerDataExtended) {
    this.passengersForm[passengersForm.id] = passengersForm;

    this.updatePassengersForm();
  }

  private updatePassengersForm() {
    this.adultsData = [];
    this.childrenData = [];
    this.infantsData = [];

    for (const id in this.passengersForm) {
      const passengerData: PassengerData = {
        firstName: this.passengersForm[id].firstName,
        lastName: this.passengersForm[id].lastName,
        gender: this.passengersForm[id].gender,
        dateOfBird: this.passengersForm[id].dateOfBird,
        baggage: this.passengersForm[id].baggage,
        baggageCount: this.passengersForm[id].baggageCount,
      };
      if (this.passengersForm[id].ageStatus === 'Adult') this.adultsData.push(passengerData);
      if (this.passengersForm[id].ageStatus === 'Children') this.childrenData.push(passengerData);
      if (this.passengersForm[id].ageStatus === 'Infant') this.infantsData.push(passengerData);
    }
  }

  addContactForm(contactForm: ContactForm) {
    this.contactForm = contactForm;
  }

  addDataToStore() {
    this.store.dispatch(
      PassengersActions.SetDataPassengers({
        adult: this.adultsData,
        child: this.childrenData,
        infant: this.infantsData,
        contacts: {
          phone: this.contactForm.phone!,
          email: this.contactForm.email!,
          countryCode: this.contactForm.countryCode!,
        },
      })
    );
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

  searchForm$ = this.store.select(selectSearchFormFeature);

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
