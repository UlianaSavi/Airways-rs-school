import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingInRoutingModule } from './profile-routing.module';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SingInFormComponent, AccountComponent],
  imports: [
    CommonModule,
    SingInRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    SharedModule,
  ],
  exports: [SingInFormComponent],
})
export class ProfileModule {}
