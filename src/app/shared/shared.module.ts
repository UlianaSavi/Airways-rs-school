import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from './material';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PolicyComponent } from './components/policy/policy.component';
import { TermsComponent } from './components/terms/terms.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    PolicyComponent,
    TermsComponent
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage, MatNativeDateModule],
  exports: [
    RouterLink,
    RouterLinkActive,
    MaterialModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SharedModule {}
