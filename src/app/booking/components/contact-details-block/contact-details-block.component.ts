import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from '../../models/contact-form.model';
import { CONTACT_FROM_ID } from 'src/app/shared/constants/contact-form';

@Component({
  selector: 'app-contact-details-block',
  templateUrl: './contact-details-block.component.html',
  styleUrls: ['./contact-details-block.component.scss'],
})
export class ContactDetailsBlockComponent {
  @Output() newValidContacts = new EventEmitter<ContactForm>();

  @Output() fullField = new EventEmitter<{ id: string; value: boolean }>();

  emailPattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  contactDetailsForm = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
  });

  hasErr = () => {
    this.newValidContacts.emit(this.contactDetailsForm.value as ContactForm);
    this.fullField.emit({ id: CONTACT_FROM_ID, value: !this.contactDetailsForm.invalid });
  };
}
