import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  constructor(private autServise: AuthService) {}

  testRegister = () => {
    const test = {
      name: {
        firstName: 'tester4',
        lastName: 'tester4',
      },
      email: 'tester4@test.ru',
      password: '666666',
      birthDate: '08.12.1999',
      gender: '',
      phone: '',
      citizenship: '',
    };

    this.autServise.register(test);
  };

  testLogIn = () => {
    const testEmail = 'tester4@test.ru';
    const testPassword = '666666';

    this.autServise.login(testEmail, testPassword);
  };
}
