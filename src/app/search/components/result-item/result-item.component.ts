import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ITicket } from '../../models/tickets.model';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';
import { SelectTicket } from 'src/app/redux/actions/select-ticket.actions';
import { SelectBackTicket } from 'src/app/redux/actions/select-ticket.actions';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent {
  @Input() isBack = false;

  @Input() cityFrom: string | null = null;

  @Input() cityTo: string | null = null;

  tickets$: Observable<ITicket[]> = this.store.select(selectTickets);

  currTicket: ITicket | null = null;

  selectedDate!: Date;

  selected = false;

  constructor(private store: Store) {}

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
    if (this.currTicket && this.currTicket.type === 'from') {
      this.store.dispatch(SelectTicket({ ticket: this.currTicket }));
    }
    if (this.currTicket && this.currTicket.type === 'back') {
      this.store.dispatch(SelectBackTicket({ backTicket: this.currTicket }));
    }
  }
}
