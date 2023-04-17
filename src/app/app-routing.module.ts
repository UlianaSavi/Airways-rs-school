import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
    canActivate: [],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [],
  },
  {
    path: 'page404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
