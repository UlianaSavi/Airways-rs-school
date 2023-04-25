import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dateDestinationValidator } from '../../validators/validators';
import { PassengersType } from '../../models/passengers.model';
import { City, mockCities } from '../../mock-data';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search-criteria-edit-block',
  templateUrl: './search-criteria-edit-block.component.html',
  styleUrls: ['./search-criteria-edit-block.component.scss'],
})
export class SearchCriteriaEditBlockComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  private cities: City[] = mockCities;

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  minDate = '';

  typeOfPassengers: PassengersType[] = ['adult', 'child', 'infant'];

  hiddenAddition = false;

  searchEditForm = this.fb.group({
    typeOfFlight: ['', Validators.required],
    from: ['', Validators.required],
    destination: ['', Validators.required],
    dateFrom: ['', Validators.required],
    dateDestination: ['', dateDestinationValidator()],
    amountOfPass: this.fb.group<Record<PassengersType, number>>({
      adult: 1,
      child: 0,
      infant: 0,
    }),
  });

  onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log(123);
  };

  switchDestinations(from: HTMLInputElement, to: HTMLInputElement) {
    [from.value, to.value] = [to.value, from.value];
  }

  setCountPassengers(newCountPassengers: [PassengersType, number]) {
    this.searchEditForm.controls.amountOfPass.controls[newCountPassengers[0]].setValue(
      newCountPassengers[1]
    );
  }

  displayFn(city: string): string {
    return city ? city : '';
  }

  ngOnInit() {
    this.searchEditForm.controls.typeOfFlight.setValue('round');

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

    this.minDate = new Date().toISOString().slice(0, 10);
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter(
      (city) =>
        city.name.toLowerCase().includes(filterValue) ||
        city.code.toLowerCase().includes(filterValue)
    );
  }
}
