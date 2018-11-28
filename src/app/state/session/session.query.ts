import {Query, toBoolean} from '@datorama/akita';
import {distinctUntilChanged, filter, map, share, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SessionState, SessionStore} from './session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {
  isLoggedIn$ = this.select(session => session.token)
    .pipe(
      distinctUntilChanged(),
      map(token => !!token),
      share()
    );

  constructor(protected store: SessionStore) {
    super(store);
  }
}
