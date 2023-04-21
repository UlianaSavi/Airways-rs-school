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
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.scss'],
})
export class SingInFormComponent implements OnInit, OnDestroy {
  constructor(private singInStatusService: SingInStatusService, private authService: AuthService) {}

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
    this.authService.login(this.logInForm.value.email!, this.logInForm.value.password!);
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
  }

  hide = true;

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
