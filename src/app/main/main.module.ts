import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchPageComponent, ResultPageComponent, SearchFormComponent],
  imports: [CommonModule, MainRoutingModule, ReactiveFormsModule, SharedModule],
})
export class MainModule {}
