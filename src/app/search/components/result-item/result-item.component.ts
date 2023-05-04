import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITicket } from '../../models/tickets.model';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';

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

  selected = false;

  constructor(private store: Store) {}

  addSelectedTicket(selected: boolean) {
    this.selected = selected;
    // TODO set current ticket
    // if (this.currTicket.type !== 'back') {
    //   this.store.dispatch(SelectBackTicket({ backTicket: currTicket }));
    // } else {
    //   this.store.dispatch(SelectTicket({ ticket: currTicket }));
    // }
  }
}
