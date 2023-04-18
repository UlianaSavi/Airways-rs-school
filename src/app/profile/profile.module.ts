import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SingInRoutingModule } from './profile-routing.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [SingInFormComponent, AccountComponent],
  imports: [CommonModule, SingInRoutingModule],
})
export class ProfileModule {}
