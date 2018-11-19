import {AppService, LOCAL_STORAGE_TOKEN_KEY, LoginHttpAnswer} from './app';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class FakeAppService extends AppService {
  private t_users = [
    {
      login: 'admin',
      password: 'passwd',
      token: 'token-1234567'
    }
  ];

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient);
  }

  protected loginHttp(login: string, password: string): Observable<LoginHttpAnswer> {
    const user = _.find(this.t_users, (u) => u.login === login);

    if (!!user && user.password === password) {
      return of({
        token: 'token-1234567'
      });
    }

    return of({});
  }
}
