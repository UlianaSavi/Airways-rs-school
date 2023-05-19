import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/core/models/booking.model';
import { IQueryParams } from 'src/app/core/models/query-params.model';
import { removeBooking } from 'src/app/redux/actions/booking.actions';
import { selectBookings } from 'src/app/redux/selectors/booking.selectors';
import { selectCurrencyFormat } from 'src/app/redux/selectors/currency-date.selectors';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingTableComponent implements OnInit, OnDestroy {
  @Output() selectedCount = new EventEmitter<number>();

  currentCurrency$ = this.store.select(selectCurrencyFormat);

  bookingItems: Booking[] = [];

  bookings$: Observable<Booking[]> = this.store.select(selectBookings);

  selection = new SelectionModel<number>(true, []);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.bookings$.subscribe((bookings) => (this.bookingItems = bookings));
    this.selection.changed.subscribe(() => this.addSelectedCount());
    this.selection.select(...this.bookingItems.map((booking) => booking.id));
  }

  public setAll() {
    if (this.isAllSelected()) this.selection.clear();
    else this.selection.select(...this.bookingItems.map((booking) => booking.id));
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.bookingItems.length;
    return numSelected === numRows;
  }

  public deleteBooking(bookingId: number): void {
    this.store.dispatch(removeBooking({ id: bookingId }));
    this.selection.deselect(bookingId);
  }

  private addSelectedCount() {
    this.selectedCount.emit(this.selection.selected.length);
  }

  public editBooking(bookingId: number): void {
    const bookingItem: Booking | undefined = this.bookingItems.find(
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

    this.store.dispatch(removeBooking({ id: bookingId }));

    this.router.navigate(['search', 'results'], {
      queryParams: { ...query },
    });
  }

  public getTotal(): number {
    return this.bookingItems
      .filter((booking) => this.selection.selected.includes(booking.id))
      .reduce((acc, booking) => acc + booking.price, 0);
  }

  public sortData(sort: Sort) {
    const data = this.bookingItems.slice();
    if (!sort.active || sort.direction === '') {
      this.bookingItems = data;
      return;
    }
    this.bookingItems = data.sort((a, b) => {
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

  ngOnDestroy(): void {
    this.selection.changed.unsubscribe();
  }
}
