import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITicket } from 'src/app/search/models/tickets.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getAllTickets = () => {
    const url = '/tickets';
    return this.http.get<ITicket[]>(url);
  };

  getOneWayTickets = () => {
    let from: string | null = null;
    this.route.queryParamMap.subscribe((params) => {
      from = params.get('from');
    });
    const url = `/tickets?counrty.from=${from}`;
    return this.http.get<ITicket[]>(url);
  };
}
