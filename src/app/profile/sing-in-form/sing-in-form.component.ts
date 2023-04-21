import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingInStatusService } from '../../core/services/sing-in-status.service';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.scss'],
})
export class SingInFormComponent implements OnInit, OnDestroy {
  passwordPattern = '(?=.*[0-9])(?=.*[!@#$%^?&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^?&*]{8,}';

  emailPattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required]),
  });

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBird: new FormControl('', [Validators.required, this.dateOfBirdValidator()]),
    gender: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    citizenship: new FormControl('', [Validators.required]),
    agree: new FormControl('', [Validators.required, Validators.requiredTrue]),
  });

  dateOfBirdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const adultDate = new Date();
      adultDate.setFullYear(adultDate.getFullYear() - 18);
      const invalidDate = new Date(control.value) > adultDate;
      return invalidDate ? { validDate: { value: control.value } } : null;
    };
  }

  // Методы с данными форм для дальнейшего использования
  login() {
    console.log('Данные формы singIn>', this.logInForm.value);
  }

  registration() {
    console.log('Данные формы регистрации>', this.registrationForm.value);
  }

  hide = true;

  constructor(private singInStatusService: SingInStatusService) {}

  singInActive = false;

  singInSubscription: Subscription | undefined;

  changeStatus() {
    this.singInStatusService.setSingInStatus(!this.singInActive);
  }

  ngOnInit(): void {
    this.singInSubscription = this.singInStatusService.singInStatus$.subscribe(
      (status) => (this.singInActive = status)
    );
  }

  ngOnDestroy(): void {
    this.singInSubscription?.unsubscribe();
  }
}
