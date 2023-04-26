import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @Input() isFrom = true;

  selectedDate!: Date;

  centerDateForCalendar!: Date;

  dates: Date[] = [];

  disabledBtn = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const dateFromTemp = this.isFrom ? params.get('dateFrom') : params.get('dateTo');
      if (dateFromTemp !== null) {
        this.initDates(dateFromTemp);
      }
    });
    this.disabledBtn = this.isFrom && this.isChangedDateMoreToday(this.centerDateForCalendar);
  }

  private initDates(dateFromTemp: string) {
    this.selectedDate = new Date(dateFromTemp);
    this.centerDateForCalendar = this.selectedDate;
    this.dates = this.getDatesForCalendar(this.selectedDate);
  }

  private getDatesForCalendar(centerDate: Date): Date[] {
    const day = (d: number) => new Date(centerDate.getTime() + d * 24 * 60 * 60 * 1000);
    return [day(-2), day(-1), day(0), day(1), day(2)];
  }

  public trackByFn(index: number, date: Date) {
    return date;
  }

  public isChangedDateMoreToday = (changedDate: Date): boolean =>
    changedDate.getTime() >= new Date(new Date().toDateString()).getTime();

  public datePrev() {
    if (this.disabledBtn) return;
    this.centerDateForCalendar = new Date(
      this.centerDateForCalendar.getTime() - 24 * 60 * 60 * 1000
    );
    this.dates = this.getDatesForCalendar(this.centerDateForCalendar);
    this.disabledBtn = !this.isChangedDateMoreToday(this.centerDateForCalendar);
  }

  public dateNext() {
    this.centerDateForCalendar = new Date(
      this.centerDateForCalendar.getTime() + 24 * 60 * 60 * 1000
    );
    this.dates = this.getDatesForCalendar(this.centerDateForCalendar);
    this.disabledBtn = false;
  }

  public getPrice(date: Date) {
    if (this.isChangedDateMoreToday(date)) return 55.66;
    return 0;
  }
}
