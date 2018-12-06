import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './page/login/component';
import {DashboardPageComponent} from './page/dashboard';
import {IsAuthenticatedGuard} from './guard/is-authenticated';
import {IsAnonymousGuard} from './guard/is-anonymous';
import {StubComponentPageComponent} from './page/stub';
import {UserUpsertPageComponent} from './page/user/upsert';
import {UserIndexPageComponent} from './page/user';
import {PermissionIndexPageComponent} from './page/permission';
import {RoleIndexPageComponent} from './page/role';
import {RoleUpsertPageComponent} from './page/role/upsert';
import {PermissionUpsertPageComponent} from './page/permission/upsert';


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
    path: 'permission/index',
    component: PermissionIndexPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'permission/upsert/:_id',
    component: PermissionUpsertPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'role/index',
    component: RoleIndexPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'role/upsert/:_id',
    component: RoleUpsertPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'user/index',
    component: UserIndexPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'user/upsert',
    component: UserUpsertPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'user/upsert/:_id',
    component: UserUpsertPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: '**',
    component: StubComponentPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
