import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  searchDate = new Date('2024-01-01');

  selectDate = this.searchDate;

  dates: Date[] = this.getDatesForCalendar(this.searchDate);

  private getDatesForCalendar(centerDate: Date): Date[] {
    const day = (d: number) => new Date(centerDate.getTime() + d * 24 * 60 * 60 * 1000);
    return [day(-2), day(-1), day(0), day(1), day(2)];
  }

  public trackByFn(index: number, date: Date) {
    return date;
  }

  public datePrev() {
    if (this.searchDate.getDate() > Date.now()) return;
    this.searchDate = new Date(this.searchDate.getTime() - 24 * 60 * 60 * 1000);
    this.dates = this.getDatesForCalendar(this.searchDate);
  }

  public dateNext() {
    this.searchDate = new Date(this.searchDate.getTime() + 24 * 60 * 60 * 1000);
    this.dates = this.getDatesForCalendar(this.searchDate);
  }
}
