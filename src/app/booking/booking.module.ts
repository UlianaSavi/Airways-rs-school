import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ContactDetailsBlockComponent } from './components/contact-details-block/contact-details-block.component';
import { SharedModule } from '../shared/shared.module';
import { PassengersInfoComponent } from './components/passengers-info/passengers-info.component';
import { FormsModule } from '@angular/forms';
import { SummaryOrderComponent } from './components/summary-order/summary-order.component';
import { SummaryFareComponent } from './components/summary-fare/summary-fare.component';

@NgModule({
  declarations: [
    PassengersComponent,
    SummaryComponent,
    PassengersInfoComponent,
    ContactDetailsBlockComponent,
    SummaryOrderComponent,
    SummaryFareComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule, FormsModule],
})
export class BookingModule {}
