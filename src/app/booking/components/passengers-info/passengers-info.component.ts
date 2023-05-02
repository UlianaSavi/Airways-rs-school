import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent implements OnInit {
  @Input() cardHead = 'Card-head not set';

  @Input() ageStatus: 'Adult' | 'Children' | 'Infant' = 'Adult';

  constructor(private fb: FormBuilder, private store: Store) {}

  passengersInfoForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/), Validators.minLength(2)],
    ],
    lastName: [
      '',
      Validators.required,
      [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/), Validators.minLength(2)],
    ],
    gender: ['', Validators.required],
    dateOfBird: ['', Validators.required],
    baggage: [false],
    baggageCount: [1],
  });

  baggageCount = 1;

  maxMinDate = new Date(new Date().getFullYear() - 18, 11, 31);

  formatDate$ = this.store.select(CurrencyDateSelectors.selectDateFormat);

  dateOfBird: Date | undefined;

  increase() {
    this.baggageCount += 1;
    this.passengersInfoForm.patchValue({
      baggageCount: this.baggageCount,
    });
  }

  decrease() {
    if (this.baggageCount > 1) this.baggageCount -= 1;
    this.passengersInfoForm.patchValue({
      baggageCount: this.baggageCount,
    });
  }

  onToggleChange() {
    this.baggageCount = 1;
  }

  ngOnInit(): void {
    this.formatDate$.subscribe(() => {
      this.dateOfBird = new Date(this.passengersInfoForm.value.dateOfBird!.toString());
    });
  }
}
