import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, retry } from 'rxjs';
import { ITicket } from 'src/app/search/models/tickets.model';
import { Airport } from '../models/airport.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllTickets = () => {
    const url = '/tickets';
    return this.http.get<ITicket[]>(url);
  };

  getOneWayTickets = (from: string) => {
    const url = `/tickets?country.from=${from}`;
    return this.http.get<ITicket[]>(url);
  };

  public getAirports = (searchKey: string): Observable<Airport[]> => {
    const params = new HttpParams().set('q', searchKey);

    return this.http.get<Airport[]>('search/airport', { params }).pipe(
      retry(4),
      catchError((err) => {
        // eslint-disable-next-line no-console
        console.log('Error:', err);
        return EMPTY;
      })
    );
  };
}
