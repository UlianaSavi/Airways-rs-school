import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiOneWayTicketsType, ApiTicketsType } from 'src/app/redux/actions/tickets.actions';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  canEditBlock = false;

  from: string | null = null;

  to: string | null = null;

  dateFrom: string | null = null;

  dateBack: string | null = null;

  // typeOfFlight!: 'round' | 'oneWay';

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      // this.typeOfFlight = <'round' | 'oneWay'>params.get('typeOfFlight') || 'round';
      this.from = params.get('from') || null;
      this.to = params.get('destination') || null;
      this.dateFrom = new Date(params.get('dateFrom') || '').toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      this.dateBack = params.get('dateDestination')
        ? new Date(params.get('dateDestination') || '').toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })
        : null;
    });
    if (this.dateBack) this.store.dispatch(ApiTicketsType());
    else this.store.dispatch(ApiOneWayTicketsType({ query: this.from || '' }));
  }

  editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }
}
