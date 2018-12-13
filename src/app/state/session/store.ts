import {Store, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {IUser} from '../../service/app';

export interface SessionState {
  token: string;
  user: IUser;
}

export function createInitialState(): SessionState {
  return {
    token: '',
    user: null
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'session'})
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
