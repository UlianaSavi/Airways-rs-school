import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss'],
})
export class CalendarItemComponent {
  @Input() date: Date = new Date();

  @Input() selectDate: Date = new Date();

  @Input() price = Math.random() * 100;

  dateFormat = 'dd LLL';

  currentCurrency = 'EUR';
}
