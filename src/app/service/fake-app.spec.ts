import {TestBed} from '@angular/core/testing';
import {AppService} from './app';
import {FakeAppService} from './fake-app';
import {HttpClientModule} from '@angular/common/http';

describe('FakeApp Service', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: AppService,
          useClass: FakeAppService
        }
      ]
    });
    service = TestBed.get(AppService);
    service.clearAll();
  });

  afterEach(() => {
    service.clearAll();
  });

  it('Wrong token', () => {
    service.login('user', 'wrongPassword')
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeFalsy();
      });
  });

  it('Right token', () => {
    (service as FakeAppService).t_allowAuthenticate = true;
    service.login('user', 'password')
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeTruthy();
      });
  });
});
