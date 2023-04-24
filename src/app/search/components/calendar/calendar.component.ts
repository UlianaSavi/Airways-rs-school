import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  searchDate = new Date();

  dates: Date[] = this.getDatesForCalendar(this.searchDate);

  private getDatesForCalendar(selectedDate: Date): Date[] {
    const day = (d: number) => new Date(new Date().setDate(selectedDate.getDate() + d));
    return [day(-2), day(-1), day(0), day(1), day(2)];
  }

  public trackByFn(index: number, date: Date) {
    return date;
  }
}
