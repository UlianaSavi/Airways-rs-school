import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { BackgroundColorAvailableSeats } from '../enums/seatsIndicators';

@Directive({
  selector: '[appSeatBackground]',
})
export class SeatBackgroundDirective implements OnChanges {
  @Input() availableSeats = 0;

  constructor(private el: ElementRef, private rend2: Renderer2) {}

  ngOnChanges(): void {
    this.rend2.setStyle(this.el.nativeElement, 'backgroundColor', this.color(this.availableSeats));
  }

  private color = (countSeats: number) =>
    countSeats <= 10
      ? BackgroundColorAvailableSeats.lessThan10
      : countSeats <= 100
      ? BackgroundColorAvailableSeats.lessHalf
      : BackgroundColorAvailableSeats.moreHalf;
}
