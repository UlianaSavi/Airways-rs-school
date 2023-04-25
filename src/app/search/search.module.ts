import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DetailsComponent } from './components/details/details.component';
import { AdditionPassengersComponent } from './components/addition-passengers/addition-passengers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchInfoBlockComponent } from './components/search-info-block/search-info-block.component';
import { SearchCriteriaEditBlockComponent } from './components/search-criteria-edit-block/search-criteria-edit-block.component';

@NgModule({
  declarations: [
    ResultListComponent,
    SearchFormComponent,
    DetailsComponent,
    AdditionPassengersComponent,
    SearchInfoBlockComponent,
    SearchCriteriaEditBlockComponent,
  ],
  imports: [CommonModule, SearchRoutingModule, ReactiveFormsModule, SharedModule, NgOptimizedImage],
})
export class SearchModule {}
