import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CurrencyDateSelectors from '../../../redux/selectors/currency-date.selectors';
import { AgeStatus } from 'src/app/core/models/age-status.model';
import { PassengerData } from 'src/app/core/models/passengers.model';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store) {}

  @Input() id = '';

  @Input() cardHead = 'Card-head not set';

  @Input() ageStatus: AgeStatus = 'Adult';

  @Output() newValidPassengers = new EventEmitter<PassengerData>();

  @Output() fullField = new EventEmitter<{ id: string; value: boolean }>();

  passengersInfoForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/), Validators.minLength(2)],
    ],
    lastName: [
      '',
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

  hasErr = () => {
    if (!this.passengersInfoForm.invalid) {
      this.newValidPassengers.emit(this.passengersInfoForm.value as PassengerData);
    }
    this.fullField.emit({ id: this.id, value: !this.passengersInfoForm.invalid });
  };

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
