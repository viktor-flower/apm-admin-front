import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private tokenSubject = new BehaviorSubject<string>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor() {
    this.readToken();
  }

  readToken() {
    const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));
    this.tokenSubject.next(token);

    return token;
  }

  writeToken(token: string) {
    this.tokenSubject.next(token);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
  }
}
