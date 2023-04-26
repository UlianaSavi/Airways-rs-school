import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  API_URL = 'http://localhost:4000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllTickets = () => {
    return this.http.get(this.API_URL + '/tickets', this.httpOptions).subscribe((response) => {
      console.log(response);
    });
  };

  getOneWayTickets = (from: string) => {
    return this.http
      .get(this.API_URL + `/tickets?counrty.from=${from}`, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
  };
}
