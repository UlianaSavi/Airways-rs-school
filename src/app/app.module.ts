import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileModule } from './profile/profile.module';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule, ProfileModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
