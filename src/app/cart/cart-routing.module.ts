import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartFormComponent } from './components/cart-form/cart-from.component';

const routes: Routes = [{ path: '', component: CartFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
