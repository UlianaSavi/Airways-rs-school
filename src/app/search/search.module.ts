import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AdditionPassengersComponent } from './components/addition-passengers/addition-passengers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchInfoBlockComponent } from './components/search-info-block/search-info-block.component';
import { SearchCriteriaEditBlockComponent } from './components/search-criteria-edit-block/search-criteria-edit-block.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { SeatBackgroundDirective } from './directives/seat-background.directive';
import { CalendarSeatIndicatorDirective } from './directives/calendar-seat-indicator.directive';
import { EffectsModule } from '@ngrx/effects';
import { SearchAirportEffects } from '../redux/effects/search-airport.effects';

@NgModule({
  declarations: [
    ResultListComponent,
    SearchFormComponent,
    TicketComponent,
    AdditionPassengersComponent,
    SearchInfoBlockComponent,
    SearchCriteriaEditBlockComponent,
    ResultItemComponent,
    CalendarComponent,
    CalendarItemComponent,
    SeatBackgroundDirective,
    CalendarSeatIndicatorDirective,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgOptimizedImage,
    EffectsModule.forFeature([SearchAirportEffects]),
  ],
})
export class SearchModule {}
