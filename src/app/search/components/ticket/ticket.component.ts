import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  dateDeparture = new Date('05-31-2023');

    return `${Math.floor(flightTime / 60)}h ${(flightTime % 60).toString().padStart(2, '0')}m`;
  }
}
