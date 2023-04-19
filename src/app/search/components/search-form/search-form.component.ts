import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { IUser } from '../../../core/models/user.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  constructor(private authServise: AuthService) {}

  forTestSingUp(): void {
    const testFormData: IUser = {
      name: {
        firstName: '',
        lastName: '',
      },
      email: '',
      password: '',
      birthDate: new Date(),
      gender: '',
      phone: '',
      citizenship: '',
    };
    this.authServise.register(testFormData);
  }
}
