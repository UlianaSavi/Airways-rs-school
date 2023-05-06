import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith, take } from 'rxjs';
import { PassengersType } from '../../../core/models/passengers.model';
import { dateDestinationValidator } from '../../validators/validators';
import { City } from '../../models/cities.model';
import { IQueryParams } from 'src/app/core/models/query-params.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';
import { ApiService } from 'src/app/core/services/api.service';
import { CitiesService } from 'src/app/core/services/cities.service';

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
    private apiService: ApiService,
    private citiesService: CitiesService
  ) {}

  cities: City[] | [] = [];

  $dateFormat = this.store.select(CurrencyDateSelectors.selectDateFormat);

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  minDate = new Date('05.07.2023');

  maxDate = new Date('05.16.2023');

  typeOfPassengers: PassengersType[] = ['adult', 'child', 'infant'];

  searchForm = this.fb.group({
    typeOfFlight: ['', Validators.required],
    from: ['', [Validators.required, this.validCityValidator(), this.validSameCities()]],
    destination: ['', [Validators.required, this.validCityValidator(), this.validSameCities()]],
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

  validCityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const citiesArray = this.cities.map((e) => e.name + ' ' + e.code);
      const checkInput = !citiesArray.includes(control.value);
      return checkInput ? { validCountry: { value: control.value } } : null;
    };
  }

  validSameCities(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent as FormGroup;
      if (!formGroup) {
        return null;
      }
      const from = formGroup.get('from')?.value;
      const destination = formGroup.get('destination')?.value;
      const checkSame = from === destination;
      return checkSame ? { checkSame: { value: control.value } } : null;
    };
  }

  ngOnInit() {
    this.citiesService.getCities().subscribe((cities) => {
      this.cities = cities;
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
    this.$dateFormat.pipe(take(1)).subscribe(() => {
      this.dateFrom = new Date(this.searchForm.value.dateFrom!.toString());
      this.dateDest = new Date(this.searchForm.value.dateDestination!.toString());
    });

    this.searchForm.controls.typeOfFlight.setValue('round');
  }

  displayFn(city: string): string {
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

  switchDestinations(from: HTMLInputElement, to: HTMLInputElement) {
    [from.value, to.value] = [to.value, from.value];
  }

  setCountPassengers(newCountPassengers: [PassengersType, number]) {
    this.searchForm.controls.amountOfPass.controls[newCountPassengers[0]].setValue(
      newCountPassengers[1]
    );
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formVal = this.searchForm.value;
    const query: IQueryParams = {
      typeOfFlight: formVal.typeOfFlight || '',
      from: formVal.from?.slice(0, -4) || '',
      destination: formVal.destination?.slice(0, -4) || '',
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
