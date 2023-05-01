import { Component, Input, OnInit } from '@angular/core';
import { ITicket } from '../../models/tickets.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  dateFrom: Date | string = '';

  dateTo: Date | string = '';

  @Input() currTicket: ITicket | null = null;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.dateFrom = new Date(params.get('dateFrom') || '');
      this.dateTo = new Date(params.get('dateDestination') || '');
    });
  }
}
