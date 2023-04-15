import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
  {
    path: ':searchRequest',
    component: ResultPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
