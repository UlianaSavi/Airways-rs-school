import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PassengerData, PassengersType } from 'src/app/core/models/passengers.model';
import { selectPassengersData } from 'src/app/redux/selectors/passengers.selectors';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from 'src/app/search/models/tickets.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  ticket$: Observable<ITicket | null> = this.store.select(selectTicket);

  backTicket$: Observable<ITicket | null> = this.store.select(selectBackTicket);

  passengersData$: Observable<Record<PassengersType, PassengerData[]>> =
    this.store.select(selectPassengersData);

  constructor(private store: Store, private router: Router) {}

  public buyNow() {
    this.router.navigateByUrl('/cart');
  }
}
