import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartFormComponent } from './components/cart-form/cart-from.component';

@NgModule({
  declarations: [CartFormComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
