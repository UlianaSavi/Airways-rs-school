import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  dateDeparture = new Date('05-31-2023');

  dateArrival = new Date('06-01-2023');
}
