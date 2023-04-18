import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DetailsComponent } from './components/details/details.component';
import { AdditionPassengersComponent } from './components/addition-passengers/addition-passengers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ResultListComponent,
    SearchFormComponent,
    DetailsComponent,
    AdditionPassengersComponent,
  ],
  imports: [CommonModule, SearchRoutingModule, ReactiveFormsModule, SharedModule],
})
export class SearchModule {}
