import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PassengersAgeText, PassengersTypeText } from '../../enums/passengers';
import { PassengersType } from '../../../core/models/passengers.model';

@Component({
  selector: 'app-addition-passengers',
  templateUrl: './addition-passengers.component.html',
  styleUrls: ['./addition-passengers.component.scss'],
})
export class AdditionPassengersComponent implements OnInit {
  @Input() typeOfPassengers!: PassengersType;

  @Input() countPassengers!: number;

  @Output() newCountPassengers = new EventEmitter<[PassengersType, number]>();

  passengersType = '';

  passengersAgeText = '';

  ngOnInit(): void {
    this.passengersType = PassengersTypeText[this.typeOfPassengers];
    this.passengersAgeText = PassengersAgeText[this.typeOfPassengers];
  }

  increment() {
    this.countPassengers++;
    this.newCountPassengers.emit([this.typeOfPassengers, this.countPassengers]);
  }

  decrement() {
    const minCount = this.typeOfPassengers === 'adult' ? 2 : 1;
    if (this.countPassengers >= minCount) {
      this.countPassengers--;
      this.newCountPassengers.emit([this.typeOfPassengers, this.countPassengers]);
    }
  }
}
