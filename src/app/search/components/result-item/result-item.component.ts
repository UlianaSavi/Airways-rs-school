import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITicket } from '../../models/tickets.model';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';
import { Store } from '@ngrx/store';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent implements OnChanges, OnInit {
  @Input() isBack = false;

  @Input() cityFrom: string | null = null;

  tickets$: Observable<ITicket[]> = this.store.select(selectTickets);

  selectedTicket$: Observable<ITicket | null> = of(null);

  selectedDate: Date = new Date('05.07.2023');

  currTicket: ITicket | null = null;

  selected = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedTicket$ = this.isBack
      ? this.store.select(selectBackTicket)
      : this.store.select(selectTicket);
  }

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
    this.tickets$.subscribe((tickets) => {
      this.currTicket =
        this.filterTickets(tickets).find(
          (ticket) => new Date(ticket.date).getTime() === date.getTime()
        ) || null;
    });
    this.tickets$.subscribe((tickets) => {
      this.currTicket =
        this.filterTickets(tickets).find(
          (ticket) => new Date(ticket.date).getTime() === date.getTime()
        ) || null;
    });
  }
}
