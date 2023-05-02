import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from '../../models/contact-form.model';

@Component({
  selector: 'app-contact-details-block',
  templateUrl: './contact-details-block.component.html',
  styleUrls: ['./contact-details-block.component.scss'],
})
export class ContactDetailsBlockComponent {
  @Output() newValidContacts = new EventEmitter<ContactForm>();

  emailPattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  contactDetailsForm = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
  });

  haErr = () => {
    if (!this.contactDetailsForm.invalid) {
      this.newValidContacts.emit(this.contactDetailsForm.value as ContactForm);
    }
  };
}
