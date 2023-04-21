import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from './material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  exports: [RouterLink, RouterLinkActive, MaterialModule, NgOptimizedImage, ReactiveFormsModule],
})
export class SharedModule {}
