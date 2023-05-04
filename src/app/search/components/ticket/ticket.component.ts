import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  dateDeparture = new Date('05-31-2023');

  dateArrival = new Date('06-01-2023');

  selected = false;

  @Output() newSelectedTicket = new EventEmitter<boolean>();

  ticketClicked = () => {
    this.selected = !this.selected;
    this.newSelectedTicket.emit(this.selected);
  };
}
