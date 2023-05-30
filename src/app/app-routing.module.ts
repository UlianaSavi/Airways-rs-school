import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectGuard } from './core/guards/redirect.guard';
import { PolicyComponent } from './shared/components/policy/policy.component';
import { TermsComponent } from './shared/components/terms/terms.component';

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
    canActivate: [AuthGuard, RedirectGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard, RedirectGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
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
