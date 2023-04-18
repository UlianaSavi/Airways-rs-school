import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { City, mockCities } from '../../mock-data';
import { Observable, map, startWith } from 'rxjs';
import { PassengersType } from '../../models/passengers.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  private cities: City[] = mockCities;

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  minDate = '';

  typeOfPassengers: ('adult' | 'child' | 'infant')[] = ['adult', 'child', 'infant'];

  searchForm = this.fb.group({
    typeOfFlight: ['', Validators.required],
    from: ['', Validators.required],
    destination: ['', Validators.required],
    dateFrom: ['', Validators.required],
    dateDestination: ['', Validators.required],
    amountOfPass: this.fb.group<Record<'adult' | 'child' | 'infant', number>>({
      adult: 1,
      child: 0,
      infant: 0,
    }),
  });

  hiddenAddition = false;

  ngOnInit() {
    this.searchForm.controls.typeOfFlight.setValue('round');

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

    this.minDate = new Date().toISOString().slice(0, 10);
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

  setCountPassengers(newCountPassengers: [PassengersType, number]) {
    this.searchForm.controls.amountOfPass.controls[newCountPassengers[0]].setValue(
      newCountPassengers[1]
    );
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }

  constructor(private fb: FormBuilder) {}
}
