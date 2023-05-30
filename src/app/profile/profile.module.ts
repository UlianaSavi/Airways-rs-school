import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingInRoutingModule } from './profile-routing.module';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SingInFormComponent, AccountComponent],
  imports: [CommonModule, SingInRoutingModule, SharedModule],
  exports: [SingInFormComponent],
})
export class ProfileModule {}
