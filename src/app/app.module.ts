import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {DashboardPageComponent} from './page/dashboard';
import {LoginPageComponent} from './page/login/component';
import { environment } from '../environments/environment';
import {AppService} from './service/app';
import {FakeAppService} from './service/fake-app';
import {HttpClientModule} from '@angular/common/http';
import {UiService} from './service/ui';
import {ReactiveFormsModule} from '@angular/forms';
import {IsAnonymousGuard} from './guard/is-anonymous';
import {IsAuthenticatedGuard} from './guard/is-authenticated';
import {StubComponentPage} from './page/stub';

export const matLibraries = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule
];

export const allLibraries = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  ...matLibraries
];

export const allComponents = [
  AppComponent,
  LoginPageComponent,
  DashboardPageComponent,
  StubComponentPage
];

export const allProviders: any[] = [
  UiService,
  IsAnonymousGuard,
  IsAuthenticatedGuard
];

// Injects a fake service to be able to work without backend for presentation purpose.
if (!!environment.fake) {
  allProviders.push({
    provide: AppService,
    useClass: FakeAppService
  });
} else {
  allProviders.push(AppService);
}

export const ngModule = {
  declarations: allComponents,
  imports: allLibraries,
  providers: allProviders,
  bootstrap: [AppComponent],
};

@NgModule(ngModule)
export class AppModule {
}
