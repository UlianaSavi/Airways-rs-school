import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { selectPurchasedTickets } from '../../redux/selectors/booking.selectors';
import { selectCurrencyFormat } from '../../redux/selectors/currency-date.selectors';
import { ITicketExtended } from '../../search/models/tickets.model';
import { Booking } from '../../core/models/booking.model';
import { Router } from '@angular/router';
import {
  setSelectedBackTicket,
  setSelectedTicket,
} from '../../redux/actions/select-ticket.actions';
import { SetDataPassengers } from '../../redux/actions/passengers.actions';
import { Sort } from '@angular/material/sort';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(public authService: AuthService, private store: Store, private route: Router) {}

  currentCurrency$ = this.store.select(selectCurrencyFormat);

  purchasedTickets$ = this.store.select(selectPurchasedTickets);

  purchasedTickets: Booking[] = [];

  ngOnInit(): void {
    this.purchasedTickets$.subscribe((bookings) => (this.purchasedTickets = bookings));
  }

  goSummary(ticket: Booking) {
    const ticketsInfo = ticket.ticketsInfo;

    const selectedTicket: ITicketExtended = {
      id: ticketsInfo.ticket.id,
      country: { from: ticketsInfo.ticket.country.from, to: ticketsInfo.ticket.country.to },
      date: new Date(ticketsInfo.ticket.date),
      price: +ticketsInfo.ticket.price,
      flightNum: ticketsInfo.ticket.flightNum,
      seats: ticketsInfo.ticket.seats,
      times: { start: ticketsInfo.ticket.times.start, end: ticketsInfo.ticket.times.end },
      type: ticketsInfo.ticket.type,
    };

    this.store.dispatch(setSelectedTicket({ ticket: selectedTicket }));

    let selectedBackTicket: ITicketExtended;

    if (ticketsInfo.backTicket) {
      selectedBackTicket = {
        id: ticketsInfo.backTicket.id,
        country: {
          from: ticketsInfo.backTicket.country.from,
          to: ticketsInfo.backTicket.country.to,
        },
        date: new Date(ticketsInfo.backTicket.date),
        price: +ticketsInfo.backTicket.price,
        flightNum: ticketsInfo.backTicket.flightNum,
        seats: ticketsInfo.backTicket.seats,
        times: { start: ticketsInfo.backTicket.times.start, end: ticketsInfo.backTicket.times.end },
        type: ticketsInfo.backTicket.type,
      };

      this.store.dispatch(setSelectedBackTicket({ backTicket: selectedBackTicket }));
    }

    this.store.dispatch(
      SetDataPassengers({
        adult: ticket.passengersData.data.adult,
        child: ticket.passengersData.data.child,
        infant: ticket.passengersData.data.infant,
        contacts: ticket.passengersData.contacts,
      })
    );

    this.route.navigate(['booking', 'summary'], { queryParams: { from: '/profile' } });
  }

  public sortData(sort: Sort) {
    const data = this.purchasedTickets.slice();
    if (!sort.active || sort.direction === '') {
      this.purchasedTickets = data;
      return;
    }
    this.purchasedTickets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const aType = a.backTicket ? 'round' : 'one';
      const bType = a.backTicket ? 'round' : 'one';
      switch (sort.active) {
        case 'flightNum':
          return compare(a.ticket.flightNum, b.ticket.flightNum, isAsc);
        case 'flight':
          return compare(a.city.from, b.city.to, isAsc);
        case 'type':
          return compare(aType, bType, isAsc);
        case 'date':
          return compare(a.ticket.date, b.ticket.date, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}
