import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryParams } from '../models/query-params.model';
import { ITicket } from 'src/app/search/models/tickets.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllTickets = (query: IQueryParams) => {
    const url = '/tickets';
    const params = new HttpParams()
      .set('from', `${query.from}`)
      .set('dateFrom', `${query.dateFrom}`)
      .set('to', `${query.destination}`);
    return this.http.get<ITicket[]>(url, { params });
  };

  getOneWayTickets = (query: IQueryParams) => {
    const url = `/tickets?counrty.from=${query.from}.dateFrom=${query.dateFrom}`;
    const params = new HttpParams()
      .set('from', `${query.from}`)
      .set('dateFrom', `${query.dateFrom}`)
      .set('to', `${query.destination}`);
    return this.http.get<ITicket[]>(url, { params });
  };
}
