import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AdditionPassengersComponent } from './components/addition-passengers/addition-passengers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchInfoBlockComponent } from './components/search-info-block/search-info-block.component';
import { SearchCriteriaEditBlockComponent } from './components/search-criteria-edit-block/search-criteria-edit-block.component';
import { StoreModule } from '@ngrx/store';
import { TicketsReducers } from '../store/redusers/tickets.reduser';
import { TicketsEffects } from '../store/effects/tickets.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ResultListComponent,
    SearchFormComponent,
    AdditionPassengersComponent,
    SearchInfoBlockComponent,
    SearchCriteriaEditBlockComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgOptimizedImage,
    EffectsModule.forFeature([TicketsEffects]),
    StoreModule.forFeature('catalog', TicketsReducers),
  ],
})
export class SearchModule {}
