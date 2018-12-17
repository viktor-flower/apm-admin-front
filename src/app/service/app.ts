import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {first, map, tap} from 'rxjs/operators';
import {SessionState, SessionStore} from '../state/session/store';
import {SessionQuery} from '../state/session/query';
import {createSession, ISession} from '../state/session/model';
import {CoreService} from './core';
import {flatMap} from 'rxjs/internal/operators';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

export interface LoginHttpAnswer {
  token: string;
  user: IUser;
}

export interface IUser {
  _id?: string;
  name: string;
  description?: string;
  roles?: IRole[];
  roleIds?: string[];
}

export interface IRole {
  _id?: string;
  name: string;
  title: string;
  description?: string;
  permissions?: IPermission[];
  permissionIds?: string[];
}

export interface IPermission {
  _id?: string;
  name: string;
  title: string;
  description?: string;
}

export enum ESystemRole {
  ANONYMOUSE = 'SYSTEM:ANONYMOUSE',
  AUTHENTICATED = 'SYSTEM:AUTHENTICATED',
  ADMINISTER = 'SYSTEM:ADMINISTER'
}

export const ANONYMOUSE_ROLE = ESystemRole.ANONYMOUSE
export const AUTHENTOCATED_ROLE = ESystemRole.AUTHENTICATED

export enum EAdminPermission {
  LOGIN = 'ADMIN:LOGIN',
  ADMIN_SERVICE_ACCESS = 'ADMIN:ADMIN_SERVICE_ACCESS',
  MANAGE_PERMISSIONS = 'ADMIN:MANAGE_PERMISSIONS',
  MANAGE_ROLES = 'ADMIN:MANAGE_ROLES',
  MANAGE_USERS = 'ADMIN:MANAGE_USERS',
  FETCH_OWN_ACL = 'SERVICE:FETCH_OWN_ACL',
  FETCH_ANY_ACL = 'SERVICE:FETCH_ANY_ACL'
}

@Injectable()
export class AppService {
  isAuthenticated$ = this.sessionQuery.isLoggedIn$;
  private permissionNames: string[] = [];
  private permissionNamesS = new BehaviorSubject<string[]>([]);
  private permissionNames$ = this.permissionNamesS.asObservable();
  private roleNamesS = new BehaviorSubject<string[]>([]);
  private roleNames$ = this.roleNamesS.asObservable();
  private roleNames: string[] = [];
  public session$ = this.sessionQuery.select();

  constructor(
    private coreService: CoreService,
    private httpClient: HttpClient,
    private sessionQuery: SessionQuery,
    private sessionStore: SessionStore
  ) {
    const token = this.coreService.readToken();
    if (token) {
      this.retrieveSesion(token)
        .subscribe((session: ISession) => {
          this.sessionStore.update(session);
        });
    }
    this.sessionQuery.select()
      .subscribe((session: SessionState) => {
        const roleNames = [];
        const permissionNames = [];

        if (session.user) {
          session.user.roles.forEach((role) => {
            roleNames.push(role.name);
            role.permissions.forEach((permission) => {
              permissionNames.push(permission.name);
            });
          });
        }
        this.permissionNamesS.next(permissionNames);
        this.roleNamesS.next(roleNames);
      });

    this.permissionNames$.subscribe((permissionNames) => this.permissionNames = permissionNames);
    this.roleNames$.subscribe((roleNames) => this.roleNames = roleNames);
  }

  public retrieveSesion(token: string): Observable<ISession> {
    return this.getOwnAclHttp()
      .pipe(
        map((user: IUser) => {
          const sessionDict: ISession = {
            token,
            user
          };
          const session = createSession(sessionDict);

          return session;
        })
      );
  }

  public isAuthenticated(): boolean {
    return !!this.sessionQuery.getSnapshot().token;
  }

  public hasRole(name: string) {
    return this.roleNames.indexOf(name) > 0;
  }

  public hasRole$(name: string): Observable<boolean> {
    return this.roleNames$.pipe(
      map((roleNames) => {
        return roleNames.indexOf(name) > 0;
      })
    );
  }

  public hasPermission(name: string) {
    return this.permissionNames.indexOf(name) > 0;
  }

  public hasPermission$(name: string): Observable<boolean> {
    return this.permissionNames$.pipe(
      map((permissionNames) => {
        return permissionNames.indexOf(name) >= 0;
      })
    );
  }

  public login(name: string, password: string): Observable<boolean> {
    return this.loginHttp(name, password)
      .pipe(
        flatMap<LoginHttpAnswer, boolean>(({token}, index: number): Observable<boolean> => {
          if (!token) {
            return of(false);
          }
          this.coreService.writeToken(token);

          return this.retrieveSesion(token)
            .pipe(
              tap((session: ISession) => {
                this.sessionStore.update(session);
              }),
              map((session: ISession) => !!session.token)
            );
        }),
        first()
      );
  }

  public logout() {
    this.coreService.writeToken(null);
    const sessionDict: ISession = {
      token: null,
      user: null
    };
    const session = createSession(sessionDict);
    this.sessionStore.update(session);
  }

  public clearAll() {
    this.coreService.writeToken(null);
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

  public getOwnAclHttp(): Observable<IUser> {
    return this.httpClient.get<any>(`/server/service/own-acl`);
  }

  public updateUserItemHttp(user: IUser): Observable<IUser> {
    return this.httpClient.post<any>('/server/admin/user/save', { user });
  }

  public createUserItemHttp(user: IUser): Observable<IUser> {
    return this.httpClient.post<any>('/server/admin/user/create', { user });
  }

  public setPasswordHttp(_id: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>('/server/admin/user/set-password', { _id, password })
      .pipe(
        map(({success}) => success)
      );
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
