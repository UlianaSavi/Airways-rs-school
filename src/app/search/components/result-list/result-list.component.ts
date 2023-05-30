import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as TicketsActions from 'src/app/redux/actions/tickets.actions';
import { setSearchForms } from '../../../redux/actions/search-form.actions';
import { FlightTypes, SearchFormState } from '../../../redux/reducers/search-form.reducer';
import { selectBackTicket, selectTicket } from 'src/app/redux/selectors/select-ticket.selector';
import { ITicket } from '../../models/tickets.model';
import { TicketsCheckService } from 'src/app/core/services/tickets-check.servise';

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

  selectTicket$ = this.store.select(selectTicket);

  sameTicketsSubscription: Subscription | null = null;

  badDatesTicketsSubscription: Subscription | null = null;

  ticketFrom: ITicket | null = null;

  ticketBack: ITicket | null = null;

  selectBackTicket$ = this.store.select(selectBackTicket);

  sameTickets = false;

  badDatesSelect = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private ticketsCheckService: TicketsCheckService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.typeOfFlight = params.get('typeOfFlight') as FlightTypes;
      this.from = params.get('from') as string;
      this.to = params.get('destination') as string;
      this.dateFrom = new Date(params.get('dateFrom') || '').toString();
      this.dateBack = params.get('dateDestination')
        ? new Date(params.get('dateDestination') || '').toString()
        : null;
      this.adult = +(params.get('adult') || 1);
      this.child = +(params.get('child') || 0);
      this.infant = +(params.get('infant') || 0);
    });
    if (this.dateBack) {
      this.store.dispatch(TicketsActions.ApiTicketsType());
    } else this.store.dispatch(TicketsActions.ApiOneWayTicketsType({ query: this.from || '' }));

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

    this.sameTicketsSubscription = this.ticketsCheckService.sameTickets$.subscribe(
      (status) => (this.sameTickets = status)
    );

    this.badDatesTicketsSubscription = this.ticketsCheckService.badDatesSelect$.subscribe(
      (status) => (this.badDatesSelect = status)
    );

    this.selectTicket$.subscribe((ticket) => {
      this.ticketFrom = ticket;
      this.sameTicketsCheck();
      this.badDatesSelectCheck();
    });
    this.selectBackTicket$.subscribe((ticketBack) => {
      this.ticketBack = ticketBack;
      this.sameTicketsCheck();
      this.badDatesSelectCheck();
    });
  }

  public sameTicketsCheck = () => {
    if (this.ticketFrom && this.ticketBack) {
      this.sameTickets = this.ticketFrom.date === this.ticketBack.date;
      this.ticketsCheckService.checkSameTickets(this.sameTickets);
    } else {
      this.sameTickets = false;
    }
  };

  public badDatesSelectCheck = () => {
    if (this.ticketFrom && this.ticketBack && !this.sameTickets) {
      this.badDatesSelect = this.ticketFrom.date > this.ticketBack.date;
      this.ticketsCheckService.checkBadDatesSelect(this.badDatesSelect);
    } else {
      this.badDatesSelect = false;
    }
  };

  public editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }

  public onContinue() {
    this.router.navigateByUrl('/booking');
  }
}
