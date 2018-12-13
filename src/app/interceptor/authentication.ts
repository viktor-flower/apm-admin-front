import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CoreService} from '../service/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
  private token: string;

  constructor(
    private coreService: CoreService
  ) {
    this.coreService.token$
      .subscribe(token => {
        this.token = token;
      });
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    if (!this.isAuthenticated()) {
      return next.handle(req);
    }
    const token = this.getToken();
    const headers = req.headers.set('Authorization', 'bearer ' + token);
    const authenticationRequest = req.clone({headers});

    return next.handle(authenticationRequest);
  }
}
