import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {SessionStore, UserDetails} from '../state/session/store';
import {SessionQuery} from '../state/session/query';
import {createSession, ISession} from '../state/session/model';
import {PartialDeep} from 'lodash';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export interface LoginHttpAnswer {
  token: string;
  userDetails: UserDetails;
}

export interface IUser {
  _id?: string;
  name: string;
  description: string;
  roles?: IRole[];
  roleIds?: string[];
}

export interface IRole {
  _id?: string;
  name: string;
  title: string;
  description: string;
  permissionIds?: string[];
}

export interface IPermission {
  _id?: string;
  name: string;
  title: string;
  description?: string;
}

@Injectable()
export class AppService {
  isAuthenticated$ = this.sessionQuery.isLoggedIn$;
  private token: string = null;

  constructor(
    private httpClient: HttpClient,
    private sessionQuery: SessionQuery,
    private sessionStore: SessionStore
  ) {
    const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));
    if (!!token) {
      this.setToken(token);
    }
  }

  isLoggedIn() {
    return !!this.sessionQuery.getSnapshot().token;
  }

  public setToken(token) {
    this.token = token;
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
    const session: ISession = {
      token
    };
    this.sessionStore.update(createSession(session));
  }

  public getToken() {
    return this.sessionQuery.getSnapshot().token;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public login(name: string, password: string): Observable<boolean> {
    return this.loginHttp(name, password)
      .pipe(
        tap<LoginHttpAnswer>(({token}) => {
          if (!!token) {
            this.setToken(token);
          }
        }),
        map(({token}) => this.isAuthenticated())
      );

    return of(true);
  }

  public logout() {
    this.setToken(null);
  }

  public clearAll() {
    this.setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  protected loginHttp(name: string, password: string): Observable<LoginHttpAnswer> {
    return this.httpClient.post<LoginHttpAnswer>('/server/anonymouse/get-token', {
      name,
      password
    });
  }

  public getUserItemHttp(id: string): Observable<IUser> {
    return this.httpClient.get<any>(`/server/admin/user/item/${id}`)
      .pipe(
        map(({user}) => user)
      );
  }

  public updateUserItemHttp(user: IUser): Observable<IUser> {
    return this.httpClient.post<any>('/server/admin/user/save', { user });
  }

  public createUserItemHttp(user: IUser): Observable<IUser> {
    return this.httpClient.post<any>('/server/admin/user/create', { user });
  }

  public getUserIndexHttp(): Observable<IUser[]> {
    return this.httpClient.get<any>(`/server/admin/user/list`)
      .pipe(
        map(({ list }) => list)
      );
  }

  public getRoleIndexHttp(): Observable<IRole[]> {
    return this.httpClient.get<any>(`/server/admin/role/list`)
      .pipe(
        map(({ list }) => list)
      );
  }

  public getRoleItemHttp(_id: string): Observable<IRole> {
    return this.httpClient.get<any>(`/server/admin/role/item/${_id}`)
      .pipe(
        map(({role}) => role)
      );
  }

  public updateRoleItemHttp(role: IRole): Observable<IRole> {
    return this.httpClient.post<any>('/server/admin/role/save', { role });
  }

  public createRoleItemHttp(role: IRole): Observable<IRole> {
    return this.httpClient.post<any>('/server/admin/role/create', { role });
  }

  public getPermissionIndexHttp(): Observable<IPermission[]> {
    return this.httpClient.get<any>(`/server/admin/permission/list`)
      .pipe(
        map(({ list }) => list)
      );
  }

  public getPermissionItemHttp(_id: string): Observable<IPermission> {
    return this.httpClient.get<any>(`/server/admin/permission/item/${_id}`)
      .pipe(
        map(({permission}) => permission)
      );
  }

  public updatePermissionItemHttp(permission: IPermission): Observable<IPermission> {
    return this.httpClient.post<any>('/server/admin/permission/save', { permission });
  }

  public createPermissionItemHttp(permission: IPermission): Observable<IPermission> {
    return this.httpClient.post<any>('/server/admin/permission/create', { permission });
  }
}
