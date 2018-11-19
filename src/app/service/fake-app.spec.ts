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

  it('Wrong credentials', () => {
    service.login('admin', 'wrongPassword')
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeFalsy();
      });
  });

  it('Right credentials', () => {
    service.login('admin', 'passwd')
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeTruthy();
      });
  });
});
