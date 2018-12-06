import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppService} from '../service/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private appService: AppService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.appService.isAuthenticated()) {
      return next.handle(req);
    }
    const token = this.appService.getToken();
    const headers = req.headers.set('Authentication', 'bearer ' + token);
    const authenticationRequest = req.clone({headers});

    return next.handle(authenticationRequest);
  }
}