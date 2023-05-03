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

  duration = '';

  @Input() currTicket: ITicket | null = null;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.dateFrom = new Date(params.get('dateFrom') || '');
      this.dateTo = new Date(params.get('dateDestination') || '');
      const timeTo = Number(this.currTicket?.times.end.slice(0, 2)) || 2;
      const timeFrom = Number(this.currTicket?.times.start.slice(0, 2)) || 1;
      console.log(this.currTicket?.times);
      console.log(timeTo);
      console.log(timeFrom);
      this.duration = `${timeTo - timeFrom}h`;
    });
  }
}
