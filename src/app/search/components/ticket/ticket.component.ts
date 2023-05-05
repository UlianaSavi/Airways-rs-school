import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from '../../models/tickets.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  dateFrom: Date | string = '';

  dateTo: Date | string = '';

  selected = false;

  @Output() newSelectedTicket = new EventEmitter<boolean>();

  @Input() currTicket: ITicket | null = null;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.dateFrom = new Date(params.get('dateFrom') || '');
      this.dateTo = new Date(params.get('dateDestination') || '');
    });
  }

  ticketClicked = () => {
    this.selected = !this.selected;
    this.newSelectedTicket.emit(this.selected);
  };

  public getDuration(): string {
    if (!this.currTicket) return '00h 00min';

    const takeoff = this.currTicket.times.start;
    const landing = this.currTicket.times.end;
    const flightTime =
      (Date.parse('1990-12-12 ' + landing) - Date.parse('1990-12-12 ' + takeoff)) / 1000 / 60;

    return `${Math.floor(flightTime / 60)}h ${(flightTime % 60).toString().padStart(2, '0')}m`;
  }
}
