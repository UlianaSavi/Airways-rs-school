import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [PassengersComponent, SummaryComponent],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
