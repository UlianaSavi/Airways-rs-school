import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DetailsComponent } from './components/details/details.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
  },
  {
    path: ':searchRequest',
    component: ResultListComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
