import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { DetailsComponent } from './components/details/details.component';
import { AdditionPassengersComponent } from './components/addition-passengers/addition-passengers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';

@NgModule({
  declarations: [
    ResultListComponent,
    SearchFormComponent,
    DetailsComponent,
    AdditionPassengersComponent,
    ResultItemComponent,
    CalendarComponent,
    CalendarItemComponent,
  ],
  imports: [CommonModule, SearchRoutingModule, ReactiveFormsModule, SharedModule],
})
export class SearchModule {}
