import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent {
  @Input() cardHead = 'Card-head not set';

  @Input() ageStatus: 'Adult' | 'Children' | 'Infant' = 'Adult';

  constructor(private fb: FormBuilder) {}

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
    baggageCount: [0],
  });

  baggageCount = 0;

  maxMinDate = new Date(new Date().getFullYear() - 18, 11, 31);

  increase() {
    this.baggageCount += 1;
    this.passengersInfoForm.patchValue({
      baggageCount: this.baggageCount,
    });
  }

  decrease() {
    if (this.baggageCount > 0) this.baggageCount -= 1;
    this.passengersInfoForm.patchValue({
      baggageCount: this.baggageCount,
    });
  }

  onToggleChange() {
    this.baggageCount = 0;
  }

  onSubmit() {
    console.log(this.passengersInfoForm.value);
  }
}
