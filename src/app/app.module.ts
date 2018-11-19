import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {DashboardPageComponent} from './page/dashboard';
import {LoginPageComponent} from './page/login';
import { environment } from '../environments/environment';
import {AppService} from './service/app';
import {FakeAppService} from './service/fake-app';
import {HttpClientModule} from '@angular/common/http';

export const matLibraries = [
  MatCardModule,
  MatToolbarModule
];

export const allLibraries = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRoutingModule,
  ...matLibraries
];

export const allComponents = [
  AppComponent,
  LoginPageComponent,
  DashboardPageComponent
];

export const allProviders = [
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

console.log(ngModule);

@NgModule(ngModule)
export class AppModule {
}
