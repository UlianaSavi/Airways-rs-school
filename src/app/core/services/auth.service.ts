import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../models/register-response.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  AUTH_API = 'http://localhost:4000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  isLoggedIn = !!localStorage.getItem('currentUser');

  currentUser: IUser | null = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '')
    : null;

  login(email: string, password: string) {
    return this.http
      .post(
        this.AUTH_API + '/login',
        {
          email,
          password,
        },
        this.httpOptions
      )
      .subscribe((response) => {
        const res = response as IResponse;
        this.currentUser = res.user;
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        this.isLoggedIn = true;
      });
  }

  register(userData: IUser) {
    this.http
      .post(this.AUTH_API + '/register', userData, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error caught in service: ', err.error);

          return throwError(() => err);
        })
      )
      .subscribe((response) => {
        const res = response as IResponse;
        this.currentUser = res.user;
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        this.isLoggedIn = true;
      });
  }
}
