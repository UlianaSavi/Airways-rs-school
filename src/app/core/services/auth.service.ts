import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  AUTH_API = 'http://some-kind-of-server/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  isLoggedIn = false;

  currentUser: IUser | null = null;

  login(email: string, password: string): Observable<IUser> | IUser | string {
    // method for server
    // return this.http.post(
    //   this.AUTH_API + 'signin',
    //   {
    //     email,
    //     password,
    //   },
    //   this.httpOptions
    // );

    const users: IUser[] = JSON.parse(localStorage.getItem('users') || '');
    this.currentUser =
      users.find((user) => user.email === email && user.password === password) || null;
    const errMessage = 'Incorrect email or password';
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.isLoggedIn = true;
    }
    return this.currentUser || errMessage;
  }

  register(userData: IUser): Observable<IUser[]> | void {
    // method for server
    // return this.http.post(
    //   this.AUTH_API + 'signup',
    //   {
    //     username,
    //     email,
    //     password,
    //   },
    //   this.httpOptions
    // );

    const users: IUser[] = this.isUsers() ? JSON.parse(localStorage.getItem('users') || '') : [];
    const newUsersArr = [...users].concat(userData);
    localStorage.setItem('users', JSON.stringify(newUsersArr));
    this.isLoggedIn = true;
  }

  logout(): Observable<unknown> {
    this.isLoggedIn = false;
    return this.http.post(this.AUTH_API + 'signout', {}, this.httpOptions);
  }

  isUsers = (): boolean => {
    return localStorage.length ? true : false;
  };
}
