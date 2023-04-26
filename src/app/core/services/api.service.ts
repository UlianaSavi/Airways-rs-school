import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllTickets = (query: string) => {
    const url = '/tickets';
    const params = new HttpParams().set('q', `${query}`);
    return this.http.get(url, { params }).subscribe((response) => {
      console.log(response);
    });
  };

  getOneWayTickets = (from: string) => {
    const url = `/tickets?counrty.from=${from}`;
    return this.http.get(url).subscribe((response) => {
      console.log(response);
    });
  };
}
