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

  API_URL = 'http://localhost:4000';

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
        this.API_URL + '/login',
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
      .post(this.API_URL + '/register', userData, this.httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
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
