import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  dateDestinationValidator,
  validCityValidator,
  validSameCities,
} from '../../validators/validators';
import { PassengersType } from '../../../core/models/passengers.model';
import { Observable, map, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../../models/cities.model';
import { CitiesService } from 'src/app/core/services/cities.service';
import { IQueryParams } from 'src/app/core/models/query-params.model';
import { ApiOneWayTicketsType, ApiTicketsType } from 'src/app/redux/actions/tickets.actions';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/core/services/api.service';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';
import { FlightTypes, SearchFormState } from '../../../redux/reducers/search-form.reducer';
import { setSearchForms } from '../../../redux/actions/search-form.actions';

@Component({
  selector: 'app-search-criteria-edit-block',
  templateUrl: './search-criteria-edit-block.component.html',
  styleUrls: ['./search-criteria-edit-block.component.scss'],
})
export class SearchCriteriaEditBlockComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private router: Router,
    private store: Store,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  private cities: City[] | [] = [];

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  minDate = '';

  maxDate = '';

  typeOfPassengers: PassengersType[] = ['adult', 'child', 'infant'];

  hiddenAddition = false;

  from: string | null = null;

  to: string | null = null;

  dateFrom: Date | null = null;

  dateTo: Date | null = null;

  adult: string | null = null;

  child: string | null = null;

  infant: string | null = null;

  typeOfFlight: string | null = null;

  setCountPassengers(newCountPassengers: [PassengersType, number]) {
    this.searchEditForm.controls.amountOfPass.controls[newCountPassengers[0]].setValue(
      newCountPassengers[1]
    );
  }

  displayFn(city: string): string {
    return city ? city : '';
  }

  searchEditForm = this.fb.group({
    from: ['', Validators.required],
    destination: ['', Validators.required],
    dateFrom: [new Date(), Validators.required],
    dateDestination: [new Date(), dateDestinationValidator()],
    amountOfPass: this.fb.group<Record<PassengersType, number>>({
      adult: 1,
      child: 0,
      infant: 0,
    }),
  });

  formatDate$ = this.store.select(CurrencyDateSelectors.selectDateFormat);

  ngOnInit() {
    this.citiesService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.searchEditForm.controls.from.setValidators([
        Validators.required,
        validCityValidator(this.cities),
        validSameCities('from'),
      ]);
      this.searchEditForm.controls.destination.setValidators([
        Validators.required,
        validCityValidator(this.cities),
        validSameCities('destination'),
      ]);
    });
    this.formatDate$.subscribe(() => {
      this.dateFrom = new Date(this.searchEditForm.value.dateFrom!.toString());
      this.dateTo = new Date(this.searchEditForm.value.dateDestination!.toString());
      this.cdr.detach();
      setTimeout(() => {
        this.cdr.detectChanges();
        this.cdr.reattach();
      });
    });

    this.route.queryParamMap.subscribe((params) => {
      this.from = params.get('from') || null;
      this.to = params.get('destination') || null;
      this.dateFrom = new Date(params.get('dateFrom') || '');
      this.dateTo = new Date(params.get('dateDestination') || '');
      this.adult = params.get('adult')?.replace(/[^0-9]/g, '') || null;
      this.child = params.get('child')?.replace(/[^0-9]/g, '') || null;
      this.infant = params.get('infant')?.replace(/[^0-9]/g, '') || null;
      this.typeOfFlight = params.get('typeOfFlight') || null;
    });

    this.searchEditForm.setValue({
      from: this.from,
      destination: this.to,
      dateFrom: this.dateFrom,
      dateDestination: this.dateTo,
      amountOfPass: {
        adult: Number(this.adult),
        child: Number(this.child),
        infant: Number(this.infant),
      },
    });

    this.filteredFromCities$ = this.searchEditForm.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.from;
        return name ? this._filter(name as string) : this.cities.slice();
      })
    );
    this.filteredDestinationCities$ = this.searchEditForm.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.destination;
        return name ? this._filter(name as string) : this.cities.slice();
      })
    );

    this.minDate = new Date('05.28.2023').toISOString().slice(0, 10);
    this.maxDate = new Date('06.06.2023').toISOString().slice(0, 10);

    this.searchEditForm.get('from')?.valueChanges.subscribe(() => {
      this.searchEditForm
        .get('destination')
        ?.setErrors(validSameCities('destination')(this.searchEditForm.get('destination')!));
    });

    this.searchEditForm.get('destination')?.valueChanges.subscribe(() => {
      this.searchEditForm
        .get('from')
        ?.setErrors(validSameCities('from')(this.searchEditForm.get('from')!));
    });
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter(
      (city) =>
        city.name.toLowerCase().includes(filterValue) ||
        city.code.toLowerCase().includes(filterValue)
    );
  }

  onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formVal = this.searchEditForm.value;
    const query: IQueryParams = {
      typeOfFlight: this.typeOfFlight || '',
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
    if (this.typeOfFlight === 'round') {
      this.apiService.getAllTickets();
      this.store.dispatch(ApiTicketsType());
    }
    if (this.typeOfFlight === 'one') {
      this.apiService.getOneWayTickets(query.from || '');
      this.store.dispatch(ApiOneWayTicketsType({ query: query.from || '' }));
    }
    this.router.navigate(['search', 'results'], {
      queryParams: { ...query },
    });

    const searchForm: SearchFormState = {
      typeOfFlight: this.typeOfFlight as FlightTypes,
      from: this.searchEditForm.value.from || '',
      destination: this.searchEditForm.value.destination || '',
      dateFrom: (this.searchEditForm.value.dateFrom || new Date()).toString(),
      dateDestination: this.searchEditForm.value.dateDestination
        ? this.searchEditForm.value.dateDestination.toString()
        : null,
      passengersCount: {
        adult: this.searchEditForm.value.amountOfPass
          ? +(this.searchEditForm.value.amountOfPass.adult || 0)
          : 0,
        child: this.searchEditForm.value.amountOfPass
          ? +(this.searchEditForm.value.amountOfPass.child || 0)
          : 0,
        infant: this.searchEditForm.value.amountOfPass
          ? +(this.searchEditForm.value.amountOfPass.infant || 0)
          : 0,
      },
    };

    this.store.dispatch(setSearchForms({ searchForm }));
  };
}
