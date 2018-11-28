import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from '../service/app';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {IsAnonymousGuard} from './is-anonymous';

describe('IsAuthenticatedGuard', () => {
  let service: AppService;
  const next: ActivatedRouteSnapshot;
  const state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AppService
      ]
    });
    service = TestBed.get(AppService);
    service.clearAll();
  });

  afterEach(() => {
    service.clearAll();
  });

  it('Anonymous', () => {
    const guard = new IsAnonymousGuard(service);
    expect(guard.canActivate(next, state)).toBeTruthy();
  });

  it('Authenticated', () => {
    service.setToken('token-1234567');
    const guard = new IsAnonymousGuard(service);
    expect(guard.canActivate(next, state)).toBeFalsy();
  });
});
