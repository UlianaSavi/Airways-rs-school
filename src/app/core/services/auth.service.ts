import { Injectable } from '@angular/core';
import { IUser } from '../models/auth.model';
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

  login(email: string, password: string): Observable<IUser> | IUser | null {
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
    const currUser = users.find((user) => user.email === email && user.password === password);
    return currUser || null;
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

    const users: IUser[] = JSON.parse(localStorage.getItem('users') || '');
    const newUsersArr = [...users].concat(userData);
    localStorage.setItem('users', JSON.stringify(newUsersArr));
  }

  logout(): Observable<unknown> | void {
    return this.http.post(this.AUTH_API + 'signout', {}, this.httpOptions);
  }
}
