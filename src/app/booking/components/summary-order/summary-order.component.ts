import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { PassengerData, PassengerInfo, PassengersType } from 'src/app/core/models/passengers.model';
import { selectPassengers } from 'src/app/redux/selectors/passengers.selectors';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from 'src/app/search/models/tickets.model';

@Component({
  selector: 'app-summary-order',
  templateUrl: './summary-order.component.html',
  styleUrls: ['./summary-order.component.scss'],
})
export class SummaryOrderComponent implements OnInit {
  @Input() isBack = false;

  ticket$!: Observable<ITicket | null>;

  passengersData$: Observable<Record<PassengersType, PassengerInfo>> =
    this.store.select(selectPassengers);

  passengers!: Record<PassengersType, PassengerInfo>;

  passArr: PassengersType[] = ['adult', 'child', 'infant'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.passengersData$.pipe(take(1)).subscribe((passData) => (this.passengers = passData));
    this.ticket$ = !this.isBack
      ? this.store.select(selectTicket)
      : this.store.select(selectBackTicket);
  }

  public getAllPassengerInArray() {
    const pass: ({ passType: PassengersType } & PassengerData)[] = [];
    Object.keys(this.passengers).forEach((passType) => {
      this.passengers[passType as PassengersType].data.forEach((data) => {
        return pass.push({ passType: passType as PassengersType, ...data });
      });
    });
    return pass;
  }
}
