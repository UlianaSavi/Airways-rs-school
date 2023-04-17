import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [ResultListComponent, SearchFormComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
