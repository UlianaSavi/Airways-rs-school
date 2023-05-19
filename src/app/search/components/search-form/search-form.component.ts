import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { PassengersType } from '../../../core/models/passengers.model';
import {
  dateDestinationValidator,
  validCityValidator,
  validSameCities,
} from '../../validators/validators';
import { City } from '../../models/cities.model';
import { IQueryParams } from 'src/app/core/models/query-params.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';
import { CitiesService } from 'src/app/core/services/cities.service';
import { resetSelectedTickets } from 'src/app/redux/actions/select-ticket.actions';
import { selectSearchFormFeature } from '../../../redux/selectors/search-form.selectors';

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
    private citiesService: CitiesService,
    private cdr: ChangeDetectorRef
  ) {}

  cities: City[] | [] = [];

  $dateFormat = this.store.select(CurrencyDateSelectors.selectDateFormat);

  formData$ = this.store.select(selectSearchFormFeature);

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  minDate = new Date('05.28.2023');

  maxDate = new Date('06.06.2023');

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

  ngOnInit() {
    this.citiesService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.searchForm.controls.from.setValidators([
        Validators.required,
        validCityValidator(this.cities),
        validSameCities('from'),
      ]);
      this.searchForm.controls.destination.setValidators([
        Validators.required,
        validCityValidator(this.cities),
        validSameCities('destination'),
      ]);
      this.filteredFromCities$ = this.searchForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.from;
          return name ? this._filter(name as string) : this.cities.slice();
        })
      );
      this.filteredDestinationCities$ = this.searchForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.destination;
          return name ? this._filter(name as string) : this.cities.slice();
        })
      );
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

    this.searchForm.controls.typeOfFlight.setValue('round');

    this.searchForm.get('from')?.valueChanges.subscribe(() => {
      this.searchForm
        .get('destination')
        ?.setErrors(validSameCities('destination')(this.searchForm.get('destination')!));
    });

    this.searchForm.get('destination')?.valueChanges.subscribe(() => {
      this.searchForm.get('from')?.setErrors(validSameCities('from')(this.searchForm.get('from')!));
    });

    this.store.dispatch(resetSelectedTickets());

    this.formData$.subscribe((form) => {
      this.searchForm.patchValue({
        typeOfFlight: form.typeOfFlight,
        from: form.from,
        destination: form.destination,
        amountOfPass: form.passengersCount,
      });
      this.dateFrom = new Date(form.dateFrom);
      this.dateDest = form.dateDestination ? new Date(form.dateDestination) : undefined;
      this.cdr.detectChanges();
    });
  }

  public displayFn(city: string): string {
    return city ? city : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter(
      (city) =>
        city.name.toLowerCase().includes(filterValue) ||
        city.code.toLowerCase().includes(filterValue)
    );
  }

  public switchDestinations(from: HTMLInputElement, to: HTMLInputElement) {
    [from.value, to.value] = [to.value, from.value];
  }

  public setCountPassengers(newCountPassengers: [PassengersType, number]) {
    this.searchForm.controls.amountOfPass.controls[newCountPassengers[0]].setValue(
      newCountPassengers[1]
    );
  }

  public onSubmit() {
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
