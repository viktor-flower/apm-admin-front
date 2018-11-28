import {Store, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';

export interface UserDetails {
  id?: string;
  email: string;
}

export interface SessionState {
  token: string;
  userDetails: UserDetails;
}

export function createInitialState(): SessionState {
  return {
    token: '',
    userDetails: null
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

