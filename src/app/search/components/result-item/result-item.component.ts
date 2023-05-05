import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ITicket } from '../../models/tickets.model';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent implements OnChanges {
  @Input() isBack = false;

  @Input() cityFrom: string | null = null;

  tickets$: Observable<ITicket[]> = this.store.select(selectTickets);

  selectedDate!: Date;

  currTicket: ITicket | null = null;

  constructor(private store: Store) {}

  ngOnChanges(): void {
    if (this.cityFrom) {
      this.setCurrentTicket(this.selectedDate);
    }
  }

  public setSelectDate(date: Date) {
    this.selectedDate = date;
    this.setCurrentTicket(date);
  }

  public filterTickets(tickets: ITicket[]): ITicket[] {
    return tickets.filter(
      (ticket) =>
        ticket.type === (this.isBack ? 'back' : 'from') &&
        this.cityFrom?.includes(ticket.country.from)
    );
  }

  private setCurrentTicket(date: Date) {
    this.tickets$
      .pipe(take(1))
      .subscribe(
        (tickets) =>
          (this.currTicket =
            this.filterTickets(tickets).find(
              (ticket) => new Date(ticket.date).getTime() === date.getTime()
            ) || null)
      );
  }
}
