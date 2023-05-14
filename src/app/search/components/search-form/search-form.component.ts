import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PassengersType } from '../../../core/models/passengers.model';
import { dateDestinationValidator, validSameCities } from '../../validators/validators';
import { City } from '../../models/cities.model';
import { IQueryParams } from 'src/app/core/models/query-params.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';
import { resetSelectedTickets } from 'src/app/redux/actions/select-ticket.actions';
import { selectSearchFormFeature } from '../../../redux/selectors/search-form.selectors';
import { Airport } from 'src/app/core/models/airport.model';
import {
  selectAirports,
  selectFromAirport,
  selectToAirport,
} from 'src/app/redux/selectors/airport.selectors';
import * as AirportActions from 'src/app/redux/actions/airport.actions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  cities: City[] | [] = [];

  $dateFormat = this.store.select(CurrencyDateSelectors.selectDateFormat);

  formData$ = this.store.select(selectSearchFormFeature);

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  airport$: Observable<Airport[]> = this.store.select(selectAirports);

  fromAirport$: Observable<Airport | null> = this.store.select(selectFromAirport);

  toAirport$: Observable<Airport | null> = this.store.select(selectToAirport);

  minDate = new Date();

  maxDate = new Date('06.16.2023');

  typeOfPassengers: PassengersType[] = ['adult', 'child', 'infant'];

  searchForm = this.fb.group({
    typeOfFlight: ['', Validators.required],
    from: ['', []],
    destination: ['', []],
    dateFrom: ['', Validators.required],
    dateDestination: ['', dateDestinationValidator()],
    amountOfPass: this.fb.group<Record<PassengersType, number>>({
      adult: 1,
      child: 0,
      infant: 0,
    }),
  });

  hiddenAddition = false;

  dateFrom: Date | undefined;

  dateDest: Date | undefined;

  private searchInputValue$ = new Subject<string>();

  ngOnInit() {
    this.searchInputValue$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      this.store.dispatch(AirportActions.setSearchKeyAirport({ searchKeyAirport: value }));
    });

    this.$dateFormat.subscribe(() => {
      this.dateFrom = new Date(this.searchForm.value.dateFrom!.toString());
      this.dateDest = new Date(this.searchForm.value.dateDestination!.toString());
      this.cdr.detach();
      setTimeout(() => {
        this.cdr.detectChanges();
        this.cdr.reattach();
      });
    });

    this.searchForm.controls.dateDestination.setValue(
      this.dateDest ? this.dateDest.toString() : null
    );

    this.searchForm.controls.typeOfFlight.setValue('round');

    this.searchForm.get('from')?.valueChanges.subscribe(() => {
      this.searchForm
        .get('destination')
        ?.setErrors(validSameCities('destination')(this.searchForm.get('destination')!));
    });

    this.searchForm.get('destination')?.valueChanges.subscribe(() => {
      this.searchForm.get('from')?.setErrors(validSameCities('from')(this.searchForm.get('from')!));
    });

    //reset selected tickets in store
    this.store.dispatch(resetSelectedTickets());

    this.formData$.subscribe((form) => {
      this.searchForm.patchValue({
        typeOfFlight: form.typeOfFlight,
        from: form.from,
        destination: form.destination,
        amountOfPass: form.passengersCount,
      });
      this.searchForm.controls.dateFrom.setValue(
        form.dateFrom ? this.datePipe.transform(new Date(form.dateFrom), 'yyyy-MM-dd') : null
      );
      this.searchForm.controls.dateDestination.setValue(
        form.dateDestination
          ? this.datePipe.transform(new Date(form.dateDestination), 'yyyy-MM-dd')
          : null
      );
      this.cdr.detectChanges();
    });
  }

  public displayFn(city: string): string {
    return city ? city : '';
  }

  public switchDestinations(from: HTMLInputElement, to: HTMLInputElement) {
    [from.value, to.value] = [to.value, from.value];

    this.store.dispatch(AirportActions.changeFromAirportTooAirport());
  }

  public setCountPassengers(newCountPassengers: [PassengersType, number]) {
    this.searchForm.controls.amountOfPass.controls[newCountPassengers[0]].setValue(
      newCountPassengers[1]
    );
  }

  public searchAirport(value: string) {
    this.searchInputValue$.next(value);
  }

  public setFromAirport(airport: Airport) {
    this.store.dispatch(AirportActions.setFromAirport({ fromAirport: airport }));
    this.resetAirportStore();
  }

  public setToAirport(airport: Airport) {
    this.store.dispatch(AirportActions.seTotAirport({ toAirport: airport }));
    this.resetAirportStore();
  }

  private resetAirportStore() {
    this.store.dispatch(AirportActions.resetAirportStore());
  }

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formVal = this.searchForm.value;
    const query: IQueryParams = {
      typeOfFlight: formVal.typeOfFlight || '',
      from: formVal.from || '',
      destination: formVal.destination || '',
      dateFrom: new Date(formVal.dateFrom || '').toString() || '',
      dateDestination: formVal.dateDestination
        ? new Date(formVal.dateDestination || '').toString() || ''
        : null,
      adult: formVal.amountOfPass?.adult || 0,
      child: formVal.amountOfPass?.child || 0,
      infant: formVal.amountOfPass?.infant || 0,
    };
    this.router.navigate(['search', 'results'], {
      queryParams: { ...query },
    });
  }
}
