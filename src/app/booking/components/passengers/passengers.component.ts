import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  data = []; // TODO данные с passengers и данные с contacts собираются в один объект здесь

  constructor(private location: Location) {}

  back(): void {
    // TODO когда будет закончена выдача и выбор билетов, сюда будет поступать инфо о критериях поиска и какие билеты выбраны
    this.location.back();
  }
}
