import {TestBed} from '@angular/core/testing';
import {AppService} from './app';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

fdescribe('App Service', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AppService;
  const tdTokenExists = {token: 'token'};
  const tdTokenEmpty = {};


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(AppService);
    service.clearAll();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    service.clearAll();
  });

  it('Wrong token', () => {
    let loginInvoked = false;
    let authenticationOInvoked = false;
    service.isAuthenticated$.subscribe((isAuthenticated) => {});
    service.login('user', 'wrongPassword')
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeFalsy();
        expect(service.isAuthenticated()).toBeFalsy();
        loginInvoked = true;
      });
      service.isAuthenticated$
          .subscribe((isAuthenticated) => {
            expect(isAuthenticated).toBeTruthy();
            authenticationOInvoked = true;
          });

    const req = httpTestingController.expectOne('/server/get-token');
    req.flush(tdTokenEmpty);
    expect(loginInvoked).toBeTruthy();
    expect(authenticationOInvoked).toBeFalsy();
  });

  it('Right token', () => {
    let loginInvoked = false;
    let authenticationOInvoked = false;
    service.isAuthenticated$.subscribe((isAuthenticated) => {
    });
    service.login('user', 'password')
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeTruthy();
        expect(service.isAuthenticated()).toBeTruthy();
        loginInvoked = true;
      });
    service.isAuthenticated$
      .subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeTruthy();
        authenticationOInvoked = true;
      });

    const req = httpTestingController.expectOne('/server/get-token');
    req.flush(tdTokenExists);
    expect(loginInvoked).toBeTruthy();
    expect(authenticationOInvoked).toBeTruthy();
  });

  it('It has been already authenticated.', () => {
    service = TestBed.get(AppService);
    service.setToken('token1234');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('Logout', () => {
    service = TestBed.get(AppService);
    service.logout();
    expect(service.isAuthenticated()).toBeFalsy();
  });

});
