import {AppService, LOCAL_STORAGE_TOKEN_KEY, LoginHttpAnswer} from './app';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FakeAppService extends AppService {
  public t_isAuthenticated = false;
  public t_allowAuthenticate = false;

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient);
  }

  protected loginHttp(login: string, password: string): Observable<LoginHttpAnswer> {
    if (this.t_allowAuthenticate) {
      this.t_isAuthenticated = true;

      return of({
        token: 'token-1234567'
      });
    }

    return of({});
  }
}
