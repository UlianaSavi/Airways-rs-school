import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dateDestinationValidator } from '../../validators/validators';
import { PassengersType } from '../../models/passengers.model';
import { City, mockCities } from '../../mock-data';
import { Observable, map, startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-criteria-edit-block',
  templateUrl: './search-criteria-edit-block.component.html',
  styleUrls: ['./search-criteria-edit-block.component.scss'],
})
export class SearchCriteriaEditBlockComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  private cities: City[] = mockCities;

  filteredFromCities$!: Observable<City[]>;

  filteredDestinationCities$!: Observable<City[]>;

  minDate = '';

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

  onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // TO DO: send data to query
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

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.from = params.get('from')?.slice(0, -4) || null;
      this.to = params.get('to')?.slice(0, -4) || null;
      this.dateFrom = new Date(params.get('dateFrom') || '');
      this.dateTo = new Date(params.get('dateTo') || '');
      this.adult = params.get('adult')?.replace(/[^0-9]/g, '') || null;
      this.child = params.get('child')?.replace(/[^0-9]/g, '') || null;
      this.infant = params.get('infant')?.replace(/[^0-9]/g, '') || null;
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
