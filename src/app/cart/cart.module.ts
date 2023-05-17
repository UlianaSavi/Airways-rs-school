import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { SharedModule } from '../shared/shared.module';
import { BookingTableComponent } from './components/booking-table/booking-table.component';

@NgModule({
  declarations: [CartFormComponent, BookingTableComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
