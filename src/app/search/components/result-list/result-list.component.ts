import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TicketsACtions from 'src/app/redux/actions/tickets.actions';
import * as PassengersActions from 'src/app/redux/actions/passengers.actions';
import { setSearchForms } from '../../../redux/actions/search-form.actions';
import { FlightTypes, SearchFormState } from '../../../redux/reducers/search-form.reducer';
import { ITicket } from '../../models/tickets.model';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultListComponent implements OnInit {
  canEditBlock = false;

  typeOfFlight: FlightTypes = 'one';

  from = '';

  to = '';

  dateFrom = '';

  dateBack: string | null = null;

  adult = 1;

  child = 0;

  infant = 0;

  ticketFrom$: Observable<ITicket | null> = this.store.select(selectTicket);

  ticketBack$: Observable<ITicket | null> = this.store.select(selectBackTicket);

  ticketFromSelected = false;

  ticketBackSelected = false;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {
    this.canContinue();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.typeOfFlight = params.get('typeOfFlight') as FlightTypes;
      this.from = params.get('from') as string;
      this.to = params.get('destination') as string;
      this.dateFrom = new Date(params.get('dateFrom') || '').toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) as string;
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
    if (this.dateBack) {
      this.store.dispatch(TicketsACtions.ApiTicketsType());
    } else this.store.dispatch(TicketsACtions.ApiOneWayTicketsType({ query: this.from || '' }));

    const searchForm: SearchFormState = {
      typeOfFlight: this.typeOfFlight,
      from: this.from,
      destination: this.to,
      dateFrom: this.dateFrom,
      dateDestination: this.dateBack,
      passengersCount: {
        adult: this.adult,
        child: this.child,
        infant: this.infant,
      },
    };

    this.store.dispatch(setSearchForms({ searchForm }));
  }

  public editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }

  canContinue(): boolean {
    this.ticketFrom$.subscribe((ticket) => {
      return ticket ? (this.ticketFromSelected = true) : (this.ticketFromSelected = false);
    });
    this.ticketBack$.subscribe((ticket) => {
      return ticket ? (this.ticketBackSelected = true) : (this.ticketBackSelected = false);
    });
    if (this.typeOfFlight === 'round') {
      return this.ticketFromSelected && this.ticketBackSelected;
    } else {
      return this.ticketFromSelected;
    }
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
