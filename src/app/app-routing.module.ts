import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './page/login/component';
import {DashboardPageComponent} from './page/dashboard';
import {IsAuthenticatedGuard} from './guard/is-authenticated';
import {IsAnonymousGuard} from './guard/is-anonymous';
import {StubComponentPage} from './page/stub';
import {UserUpsertPageComponent} from './page/user/upsert';
import {UserIndexPageComponent} from './page/user';
import {PermissionIndexPageComponent} from './page/permission';
import {RoleIndexPageComponent} from './page/role';


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
    path: 'role/index',
    component: RoleIndexPageComponent,
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
    path: 'user/upsert/:id',
    component: UserUpsertPageComponent,
    canActivate: [IsAuthenticatedGuard]
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
