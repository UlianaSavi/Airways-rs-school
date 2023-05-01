import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicket } from '../../models/tickets.model';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() isBack = false;

  @Input() cityFrom: string | null = null;

  @Input() cityTo: string | null = null;

  tickets$: Observable<ITicket[]> = this.store.select(selectTickets);

  currTicket: ITicket | null = null;

  ngOnInit(): void {
    this.tickets$.subscribe((tickets) => {
      this.currTicket = tickets.at(0) || null; // TODO selection ticket
    });
  }
}
