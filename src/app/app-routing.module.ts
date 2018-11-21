import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './page/login/component';
import {DashboardPageComponent} from './page/dashboard';
import {IsAuthenticatedGuard} from './guard/is-authenticated';
import {IsAnonymousGuard} from './guard/is-anonymous';
import {StubComponentPage} from './page/stub';
import {UserUpsertPageComponent} from './page/user/upsert';


const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [IsAnonymousGuard]
  },
  {
    path: 'user/upsert',
    component: UserUpsertPageComponent,
    // canActivate: [IsAnonymousGuard]
  },
  {
    path: '**',
    component: StubComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
