import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      alert(
        "You, stranger, don't have enough access to pass to the next location. Pass the <registration and login> challenge and get enough access to pass on!"
      );
      return false;
    }
    return true;
  }
}
