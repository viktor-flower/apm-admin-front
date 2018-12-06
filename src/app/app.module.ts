import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {DashboardPageComponent} from './page/dashboard';
import {LoginPageComponent} from './page/login/component';
import {EEnvoronmentMode, environmentBase} from '../environments/environment-base';
import {AppService} from './service/app';
import {FakeAppService} from './service/fake-app';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormlyModule} from '@ngx-formly/core';
import {HttpClientModule} from '@angular/common/http';
import {UiService} from './service/ui';
import {ReactiveFormsModule} from '@angular/forms';
import {IsAnonymousGuard} from './guard/is-anonymous';
import {IsAuthenticatedGuard} from './guard/is-authenticated';
import {StubComponentPageComponent} from './page/stub';
import {UserUpsertPageComponent} from './page/user/upsert';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {UserIndexPageComponent} from './page/user';
import {PermissionIndexPageComponent} from './page/permission';
import {RoleIndexPageComponent} from './page/role';
import {RoleUpsertPageComponent} from './page/role/upsert';
import {PermissionUpsertPageComponent} from './page/permission/upsert';

export const matLibraries = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatTableModule
];

export const allLibraries = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  FormlyModule.forRoot({
    validationMessages: [
      { name: 'required', message: 'This field is required' },
    ]
  }),
  FormlyMaterialModule,
  environmentBase.mode === EEnvoronmentMode.PRODUCTION ? [] : AkitaNgDevtools.forRoot(),
  ...matLibraries
];

export const allComponents = [
  AppComponent,
  LoginPageComponent,
  DashboardPageComponent,
  StubComponentPageComponent,
  UserIndexPageComponent,
  UserUpsertPageComponent,
  PermissionIndexPageComponent,
  PermissionUpsertPageComponent,
  RoleIndexPageComponent,
  RoleUpsertPageComponent
];

export const allProviders: any[] = [
  UiService,
  IsAnonymousGuard,
  IsAuthenticatedGuard
];

// Injects a fake service to be able to work without backend for presentation purpose.
if (environmentBase.mode === EEnvoronmentMode.FAKE) {
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
