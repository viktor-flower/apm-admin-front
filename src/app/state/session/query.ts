import {Query} from '@datorama/akita';
import {distinctUntilChanged, map, share} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SessionState, SessionStore} from './store';

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
