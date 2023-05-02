import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ContactDetailsBlockComponent } from './components/contact-details-block/contact-details-block.component';
import { SharedModule } from '../shared/shared.module';
import { PassengersInfoComponent } from './components/passengers-info/passengers-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PassengersComponent,
    SummaryComponent,
    PassengersInfoComponent,
    ContactDetailsBlockComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule, FormsModule],
})
export class BookingModule {}
