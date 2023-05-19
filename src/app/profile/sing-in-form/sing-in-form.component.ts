import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopupsStatusService } from '../../core/services/popups-status.service';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/user.model';
import { emailPattern } from 'src/app/core/constants/email-pattern';

@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.scss'],
})
export class SingInFormComponent implements OnInit, OnDestroy {
  constructor(private popapsService: PopupsStatusService, private authService: AuthService) {}

  passwordPattern = '(?=.*[0-9])(?=.*[!@#$%^?&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^?&*]{8,}';

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    password: new FormControl('', [Validators.required]),
  });

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBird: new FormControl('', [Validators.required, this.dateOfBirdValidator()]),
    gender: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
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
    this.authService.login(this.logInForm.value.email!, this.logInForm.value.password!);
    this.changeStatus();
    this.logInForm.reset();
  }

  registration() {
    const userReg: IUser = {
      name: {
        firstName: this.registrationForm.value.firstName!,
        lastName: this.registrationForm.value.lastName!,
      },
      email: this.registrationForm.value.email!,
      password: this.registrationForm.value.password!,
      birthDate: this.registrationForm.value.dateOfBird!,
      gender: this.registrationForm.value.gender!,
      phone: this.registrationForm.value.countryCode! + this.registrationForm.value.phone!,
      citizenship: this.registrationForm.value.citizenship!,
    };

    this.authService.register(userReg);
    this.changeStatus();
    this.registrationForm.reset();
  }

  hide = true;

  singInActive = false;

  singInSubscription: Subscription | undefined;

  changeStatus() {
    this.popapsService.setSingInStatus(!this.singInActive);
  }

  ngOnInit(): void {
    this.singInSubscription = this.popapsService.singInStatus$.subscribe(
      (status) => (this.singInActive = status)
    );
  }

  ngOnDestroy(): void {
    this.singInSubscription?.unsubscribe();
  }
}
