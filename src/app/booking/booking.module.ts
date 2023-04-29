import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ContactDetailsBlockComponent } from './components/contact-details-block/contact-details-block.component';

@NgModule({
  declarations: [PassengersComponent, SummaryComponent, ContactDetailsBlockComponent],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
