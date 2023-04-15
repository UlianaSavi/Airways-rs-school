import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';

@NgModule({
  declarations: [SearchPageComponent, ResultPageComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
