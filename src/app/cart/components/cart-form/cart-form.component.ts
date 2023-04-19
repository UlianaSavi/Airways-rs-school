import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  constructor(private autServise: AuthService) {}

  testSingIn = () => {
    const test = {
      name: {
        firstName: 'Tester',
        lastName: 'Tester123',
      },
      email: 'tester',
      password: '',
      birthDate: new Date(),
      gender: '',
      phone: '',
      citizenship: '',
    };

    this.autServise.register(test);
  };

  testLogIn = () => {
    const testEmail = 'tester';
    const testPassword = '';

    this.autServise.login(testEmail, testPassword);
  };
}
