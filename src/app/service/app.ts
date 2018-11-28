import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {SessionStore, UserDetails} from '../state/session/store';
import {SessionQuery} from '../state/session/query';
import {createSession, ISession} from '../state/session/model';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export interface LoginHttpAnswer {
  token: string;
  userDetails: UserDetails;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  roleIds: string[];
}

export interface IRole {
  id?: string;
  name: string;
  description: string;
  permissionIds: string[];
}

export interface IPermission {
  id?: string;
  name: string;
  description: string;
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

  public isAuthenticated(): boolean {
    return !!this.sessionQuery.getSnapshot().token;
  }

  public login(login: string, password: string): Observable<boolean> {
    return this.loginHttp(login, password)
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

  protected loginHttp(login: string, password: string): Observable<LoginHttpAnswer> {
    return this.httpClient.post<LoginHttpAnswer>('/server/get-token', {
      login,
      password
    });
  }

  public getUserItemHttp(id: string): Observable<IUser> {
    return of(null);
  }

  public updateUserItemHttp(user: IUser): Observable<IUser> {
    return of(null);
  }

  public getUserIndexHttp(): Observable<IUser[]> {
    return of([]);
  }

  public getRoleIndexHttp(): Observable<IRole[]> {
    return of([]);
  }

  public getRoleItemHttp(id: string): Observable<IRole> {
    return of(null);
  }

  public updateRoleItemHttp(role: IRole): Observable<IRole> {
    return of(null);
  }

  public getPermissionIndexHttp(): Observable<IPermission[]> {
    return of([]);
  }
  public getPermissionItemHttp(id: string): Observable<IPermission> {
    return of(null);
  }

  public updatePermissionItemHttp(permission: IPermission): Observable<IPermission> {
    return of(null);
  }
}
