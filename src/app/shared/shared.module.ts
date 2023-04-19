import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from './material';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [RouterLink, RouterLinkActive, MaterialModule],
})
export class SharedModule {}
