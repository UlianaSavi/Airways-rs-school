import { Component } from '@angular/core';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export class PassengersComponent {
  data = []; // TODO данные с passengers и данные с contacts собираются в один объект здесь
}
