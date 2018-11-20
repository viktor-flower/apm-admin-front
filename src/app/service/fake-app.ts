import {AppService, LOCAL_STORAGE_TOKEN_KEY, LoginHttpAnswer} from './app';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import {delay, mapTo} from 'rxjs/operators';

@Injectable()
export class FakeAppService extends AppService {
  private t_delayPeriod = 2000;

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

  public t_setDelay(_delay: number) {
    this.t_delayPeriod = _delay;
  }

  public t_delay<T>(o: Observable<T>): Observable<T> {
    if (!!this.t_delayPeriod) {
      return o.pipe(delay(this.t_delayPeriod));
    }

    return o;
  }

  protected loginHttp(login: string, password: string): Observable<LoginHttpAnswer> {
    const user = _.find(this.t_users, (u) => u.login === login);

    if (!!user && user.password === password) {
      return this.t_delay(of({
        token: 'token-1234567'
      }));
    }

    return this.t_delay(of({}));
  }
}
