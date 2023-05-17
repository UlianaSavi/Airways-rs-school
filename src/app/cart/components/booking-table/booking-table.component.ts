import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/core/models/cart.model';
import { IQueryParams } from 'src/app/core/models/query-params.model';
import { selectCurrencyFormat } from 'src/app/redux/selectors/currency-date.selectors';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
})
export class BookingTableComponent {
  currentCurrency$ = this.store.select(selectCurrencyFormat);

  cartItems: Cart[] = [
    {
      id: 1,
      select: true,
      city: {
        from: 'Madrid',
        to: 'Dublin',
      },
      ticket: {
        date: '05.16.2023',
        times: {
          start: '7:20',
          end: '12:30',
        },
        flightNum: 'SD-233',
      },
      backTicket: {
        date: '05.18.2023',
        times: {
          start: '17:20',
          end: '22:30',
        },
        flightNum: 'SD-235',
      },
      passengers: {
        adult: 2,
        child: 1,
        infant: 0,
      },
      price: 532,
    },
    {
      id: 2,
      select: true,
      city: {
        from: 'Ulan-Ude',
        to: 'Barcelona',
      },
      ticket: {
        date: '05.16.2023',
        times: {
          start: '7:20',
          end: '12:30',
        },
        flightNum: 'SD-233',
      },
      passengers: {
        adult: 3,
        child: 2,
        infant: 1,
      },
      price: 554,
    },
  ];

  sortedData: Cart[] = this.cartItems.slice();

  allSelected = true;

  constructor(private store: Store, private router: Router) {}

  public onSelected(checked: boolean, cartItem: Cart) {
    cartItem.select = checked;
  }

  public updateAllSelected() {
    this.allSelected = this.sortedData.every((booking) => booking.select);
  }

  public setAll(selected: boolean) {
    this.allSelected = selected;
    this.sortedData.forEach((booking) => (booking.select = selected));
  }

  public someSelected(): boolean {
    return this.sortedData.filter((booking) => booking.select).length > 0 && !this.allSelected;
  }

  public delete(cartId: number): void {
    this.sortedData = this.sortedData.filter((cart) => cart.id !== cartId);
  }

  public edit(bookingId: number): void {
    const bookingItem: Cart | undefined = this.sortedData.find(
      (booking) => booking.id === bookingId
    );
    if (!bookingItem) return;
    const query: IQueryParams = {
      typeOfFlight: bookingItem.backTicket ? 'round' : 'one',
      from: bookingItem.city.from || '',
      destination: bookingItem.city.to || '',
      dateFrom: new Date(bookingItem.ticket.date || '').toString() || '',
      dateDestination: bookingItem.backTicket
        ? new Date(bookingItem.backTicket.date || '').toString() || ''
        : null,
      adult: bookingItem.passengers.adult || 0,
      child: bookingItem.passengers.child || 0,
      infant: bookingItem.passengers.infant || 0,
    };
    this.router.navigate(['search', 'results'], {
      queryParams: { ...query },
    });
  }

  public getTotal(): number {
    return this.sortedData.reduce((acc, bookingItem) => acc + bookingItem.price, 0);
  }

  public sortData(sort: Sort) {
    const data = this.cartItems.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
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
