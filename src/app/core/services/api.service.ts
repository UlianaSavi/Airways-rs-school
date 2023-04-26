import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryParams } from '../models/query-params.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllTickets = (query: IQueryParams) => {
    const url = '/tickets';
    const params = new HttpParams()
      .set('from', `${query.from}`)
      .set('to', `${query.destination}`)
      .set('dateFrom', `${query.dateFrom}`);
    return this.http.get(url, { params }).subscribe((response) => {
      console.log(response);
    });
  };

  getOneWayTickets = (query: IQueryParams) => {
    const url = `/tickets?counrty.from=${query.from}`;
    const params = new HttpParams()
      .set('from', `${query.from}`)
      .set('to', `${query.destination}`)
      .set('dateFrom', `${query.dateFrom}`);
    return this.http.get(url, { params }).subscribe((response) => {
      console.log(response);
    });
  };
}
