import {AppService, IPermission, IRole, IUser, LOCAL_STORAGE_TOKEN_KEY, LoginHttpAnswer} from './app';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import * as faker from 'faker';
import {delay, mapTo} from 'rxjs/operators';
import {SessionQuery} from '../state/session/query';
import {SessionStore} from '../state/session/store';

@Injectable()
export class FakeAppService extends AppService {
  private t_delayPeriod = 2000;

  private t_users = [
    {
      name: 'admin',
      password: 'passwd',
      token: 'token-1234567'
    }
  ];

  public t_storage: {
    permissions: IPermission[],
    roles: IRole[],
    users: IUser[]
  };

  constructor(
    httpClient: HttpClient,
    sessionQuery: SessionQuery,
    sessionStore: SessionStore
  ) {
    super(httpClient, sessionQuery, sessionStore);
    this.t_storage = this.t_generateStorage();
  }

  public t_generateStorage() {
    const permissions = this.t_generatePermissions();
    const roles = this.t_generateRoles(permissions);
    const users = this.t_generateUsers(roles, 23);

    return {
      permissions,
      roles,
      users
    };
  }

  public t_generateRoles(permissions: IPermission[]): IRole[] {
    return [
      'BaseChord Support',
      'BaseChord Manager',
      'Aaron`s Store Manager',
      'Aaron`s IT',
      'Aaron`s Auditing Dept.'
    ].map((name) => {
      return {
        id: faker.random.uuid(),
        name,
        description: faker.lorem.lines(3),
        permissionIds: _.map(permissions, 'id').filter((e) => faker.random.boolean())
      } as IRole;
    });
  }

  public t_generatePermissions() {
    return [];
    // return [
    //   ['Review deployment groups', 'review_deplyment_groups'],
    //   ['Review report', 'review_report'],
    //   ['Review store', 'review_store'],
    //   ['Review assigned store', 'review_assigned_store'],
    //   ['Review refresh station', 'review_refresh_station'],
    //   ['Review refresh session', 'review_refresh_session'],
    //   ['Review assigned refresh station', 'review_assigned_refresh_station'],
    //   ['Review audit report', 'review_audit_report'],
    //   ['Manage refresh station', 'manage_refresh_station'],
    //   ['Manage deployment groups', 'manage_deplyment_groups'],
    // ].map((i) => {
    //   return {
    //     id: faker.random.uuid(),
    //     name: i[0],
    //     description: `It has a system key ${i[1]}.`
    //   } as IPermission;
    // });
  }

  public t_generateUsers(roles: IRole[], count: number = 10): IUser[] {
    return [];
    // return _.range(count).map((index) => {
    //   const name = faker.name.firstName();
    //
    //   return {
    //     id: faker.random.uuid(),
    //     name,
    //     email: faker.internet.email(name),
    //     roleIds: _.map(roles, 'id').filter((e) => faker.random.boolean())
    //   } as IUser;
    // });
  }

  public t_setDelay(_delay: number) {
    this.t_delayPeriod = _delay;
  }

  public t_delay<T>(o: Observable<T>): Observable<T> {
    if (!!this.t_delayPeriod) {
      return o.pipe(delay(this.t_delayPeriod));
    }

    return o;
  }

  protected loginHttp(name: string, password: string): Observable<LoginHttpAnswer> {
    const user = _.find(this.t_users, (u) => u.name === name);

    if (!!user && user.password === password) {
      return this.t_delay<LoginHttpAnswer>(of({
        token: 'token-1234567',
        userDetails: {
          id: '69f',
          email: 'test@example.com',
          name: 'Test'
        }
      } as LoginHttpAnswer));
    }

    return this.t_delay(of(null));
  }

  public getUserItemHttp(id: string): Observable<IUser> {
    let user = _.find(this.t_storage.users, (u) => {
      return u.id === id;
    });
    if (!user) {
      user = this.t_storage.users[0];
    }

    return of(_.clone(user));
  }

  public getUserIndexHttp(): Observable<IUser[]> {
    return of(_.cloneDeep(this.t_storage.users));
  }

  public getPermissionIndexHttp(): Observable<IPermission[]> {
    return of(_.cloneDeep(this.t_storage.permissions));
  }

  public getRoleIndexHttp(): Observable<IRole[]> {
    return of(_.cloneDeep(this.t_storage.roles));
  }

  public getPermissionItemHttp(id: string): Observable<IPermission> {
    return of(null);

    // let permission = _.find(this.t_storage.permissions, (u) => {
    //   return u.id === id;
    // });
    // if (!permission) {
    //   permission = this.t_storage.permissions[0];
    // }
    //
    // return of(_.clone(permission));
  }

  public updatePermissionItemHttp(permission: IPermission): Observable<IPermission> {
    return of(null);

    // if (permission && !permission.id) {
    //   permission.id = faker.random.uuid();
    //   this.t_storage.permissions.push(permission);
    //
    //   return of(permission);
    // }
    //
    // const index = _.findIndex(this.t_storage.permissions, (i) => {
    //   return i.id === permission.id;
    // });
    // if (index !== -1) {
    //   this.t_storage.permissions.splice(index, 1 , permission);
    // }
    //
    // return of(permission);
  }

  public getRoleItemHttp(id: string): Observable<IRole> {
    let role = _.find(this.t_storage.roles, (r) => {
      return r.id === id;
    });
    if (!role) {
      role = this.t_storage.roles[0];
    }

    return of(_.clone(role));
  }

  public updateUserItemHttp(user: IUser): Observable<IUser> {
    if (user && !user.id) {
      user.id = faker.random.uuid();
      this.t_storage.users.push(user);

      return of(user);
    }

    const index = _.findIndex(this.t_storage.users, (u) => {
      return u.id === user.id;
    });
    if (index !== -1) {
      this.t_storage.users.splice(index, 1 , user);
    }

    return of(user);
  }

  public updateRoleItemHttp(role: IRole): Observable<IRole> {
    if (role && !role.id) {
      role.id = faker.random.uuid();
      this.t_storage.roles.push(role);

      return of(role);
    }

    const index = _.findIndex(this.t_storage.roles, (i) => {
      return i.id === role.id;
    });
    if (index !== -1) {
      this.t_storage.roles.splice(index, 1 , role);
    }

    return of(role);
  }


}

