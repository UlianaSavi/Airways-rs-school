import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ITicket } from '../../models/tickets.model';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';
import { SelectTicket, SelectBackTicket } from 'src/app/redux/actions/select-ticket.actions';

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

  selected = false;

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

  addSelectedTicket(selected: boolean) {
    this.selected = selected;

    if (!this.selected && this.currTicket?.type === 'from') {
      this.store.dispatch(SelectTicket({ ticket: null }));
    }
    if (!this.selected && this.currTicket?.type === 'back') {
      this.store.dispatch(SelectBackTicket({ backTicket: null }));
    }

    if (this.selected && this.currTicket && this.currTicket.type === 'from') {
      this.store.dispatch(SelectTicket({ ticket: this.currTicket }));
    }
    if (this.selected && this.currTicket && this.currTicket.type === 'back') {
      this.store.dispatch(SelectBackTicket({ backTicket: this.currTicket }));
    }
  }
}
