import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from '../service/app';
import {IsAuthenticatedGuard} from './is-authenticated';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

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
    const guard = new IsAuthenticatedGuard(service);
    expect(guard.canActivate(next, state)).toBeFalsy();
  });

  it('Authenticated', () => {
    service.setToken('token-1234567');
    const guard = new IsAuthenticatedGuard(service);
    expect(guard.canActivate(next, state)).toBeTruthy();
  });
});
