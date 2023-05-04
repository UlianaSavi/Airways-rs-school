import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { TicketComponent } from './components/ticket/ticket.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
  },
  {
    path: 'results',
    component: ResultListComponent,
  },
  {
    path: 'details',
    component: TicketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
