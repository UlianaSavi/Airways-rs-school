import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SeatsIndicatorsColor } from '../enums/seatsIndicators';

@Directive({
  selector: '[appCalendarSeatIndicator]',
})
export class CalendarSeatIndicatorDirective implements OnInit {
  @Input() availableSeats = 0;

  constructor(private el: ElementRef, private rend2: Renderer2) {}

  ngOnInit(): void {
    this.rend2.setStyle(
      this.el.nativeElement,
      'borderBottomColor',
      this.color(this.availableSeats)
    );
  }

  private color = (countSeats: number) =>
    countSeats <= 10
      ? SeatsIndicatorsColor.lessThan10
      : countSeats <= 100
      ? SeatsIndicatorsColor.lessHalf
      : SeatsIndicatorsColor.moreHalf;
}
