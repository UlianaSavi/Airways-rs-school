import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TicketsACtions from 'src/app/redux/actions/tickets.actions';
import * as PassengersActions from 'src/app/redux/actions/passengers.actions';

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

  adult = 1;

  child = 0;

  infant = 0;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
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
      this.adult = +(params.get('adult') || 1);
      this.child = +(params.get('child') || 0);
      this.infant = +(params.get('infant') || 0);
    });
    if (this.dateBack) this.store.dispatch(TicketsACtions.ApiTicketsType());
    else this.store.dispatch(TicketsACtions.ApiOneWayTicketsType({ query: this.from || '' }));
  }

  public editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }

  public onContinue() {
    this.store.dispatch(
      PassengersActions.SetCountPassengers({
        adult: {
          count: this.adult,
        },
        child: {
          count: this.child,
        },
        infant: {
          count: this.infant,
        },
      })
    );
    this.router.navigateByUrl('/booking');
  }
}
