import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { PassengersComponent } from './components/passengers/passengers.component';

const routes: Routes = [
  {
    path: '',
    component: PassengersComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
