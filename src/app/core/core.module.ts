import { NgModule, isDevMode } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { metaReducers, reducers } from '../redux/state.models';
import { AppEffects } from '../redux/effects/app.effects';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    NgOptimizedImage,
    ProfileModule,
    SharedModule,
    FormsModule,
  ],
})
export class CoreModule {}
