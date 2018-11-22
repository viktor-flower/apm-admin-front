import {ID, Store, StoreConfig, transaction} from '@datorama/akita';
import {createPizza} from './pizza.model';

export interface User {
  firstName: string;
  lastName: string;
  token: string;
}

export interface SessionState {
  user: User | null;
}

export function createInitialState(): SessionState {
  return {
    user: null
  };
}

export function createSession(user: User) {
  return {...user};
}

@StoreConfig({name: 'session'})
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }

  @transaction()
  addNewPizza() {
    const  newPizza = createPizza();
    this.add();
  }

  login(data: User) {
    const user = createSession(data);
    this.update({user});
  }

  logout() {
    this.update(createInitialState);
  }

}