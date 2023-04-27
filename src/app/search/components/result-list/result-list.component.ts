import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITicket } from '../../models/tickets.model';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogState } from 'src/app/redux';
import { selectTickets } from 'src/app/redux/selectors/tickets.selector';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  tickets: ITicket[] = [];

  tickets$: Observable<ITicket[]> = this.store.select(selectTickets);

  constructor(private store: Store<CatalogState>) {}

  ngOnInit = () => {
    this.store.subscribe((state) => {
      this.tickets = [...(state?.catalog ?? [])];
      console.log(state);
    });
  };

  canEditBlock = false;

  editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }
}
