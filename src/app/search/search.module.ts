import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [ResultListComponent, SearchFormComponent, DetailsComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
