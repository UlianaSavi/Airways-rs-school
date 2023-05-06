import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PassengerInfo, PassengersType } from 'src/app/core/models/passengers.model';
import { SetAllInfoPassengers } from 'src/app/redux/actions/passengers.actions';
import { SelectBackTicket, SelectTicket } from 'src/app/redux/actions/select-ticket.actions';
import { selectPassengers } from 'src/app/redux/selectors/passengers.selectors';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from 'src/app/search/models/tickets.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  ticket$: Observable<ITicket | null> = this.store.select(selectTicket);

  backTicket$: Observable<ITicket | null> = this.store.select(selectBackTicket);

  passengersData$: Observable<Record<PassengersType, PassengerInfo>> =
    this.store.select(selectPassengers);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      SelectTicket({
        ticket: {
          type: 'from',
          date: new Date('05.07.2023'),
          price: 120,
          times: { start: '7:00', end: '9:00' },
          country: { from: 'Dublin', to: 'Madrid' },
          flightNum: 'FR134',
          seats: 9,
        },
      })
    );
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      SelectBackTicket({
        backTicket: {
          type: 'from',
          date: new Date('05.10.2023'),
          price: 120,
          times: { start: '17:00', end: '19:00' },
          country: { from: 'Madrid', to: 'Dublin' },
          flightNum: 'FR126',
          seats: 9,
        },
      })
    );
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(
      SetAllInfoPassengers({
        adult: {
          count: 2,
          data: [
            {
              firstName: 'Harry',
              lastName: 'Potter',
              gender: 'male',
              dateOfBird: '02/02/2000',
              baggage: true,
              baggageCount: 1,
            },
            {
              firstName: 'Lilly',
              lastName: 'Potter',
              gender: 'female',
              dateOfBird: '03-03-2000',
              baggage: true,
              baggageCount: 2,
            },
          ],
        },
        child: {
          count: 1,
          data: [
            {
              firstName: 'Charlie',
              lastName: 'Potter',
              gender: 'male',
              dateOfBird: '02-02-2018',
              baggage: true,
              baggageCount: 1,
            },
          ],
        },
        infant: {
          count: 1,
          data: [
            {
              firstName: 'Emy',
              lastName: 'Potter',
              gender: 'female',
              dateOfBird: '02-02-2023',
              baggage: false,
              baggageCount: 0,
            },
          ],
        },
      })
    );
  }

  public addToCart() {}

  public buyNow() {
    this.router.navigateByUrl('/cart');
  }
}
