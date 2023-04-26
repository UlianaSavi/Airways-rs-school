import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITicket } from '../../models/tickets.model';
import { CatalogState } from 'src/app/store';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent {
  tickets: ITicket[] = [];

  constructor(private store: Store<CatalogState>) {
    this.store.subscribe((state) => {
      this.tickets = [...(state?.catalog ?? [])];
    });
    console.log('tickets: ', this.tickets);
  }

  canEditBlock = false;

  editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }
}
