import { Component } from '@angular/core';
import {AppService} from '../../service/app';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class AppComponent {
  title = 'Application Policy Manager';
  public isAuthenticatedO: Observable<boolean>;

  constructor(
    private appService: AppService,
    private router: Router
  ) {
    this.isAuthenticatedO = this.appService.getAuthenticationO();
  }

  logout() {
    this.appService.logout();
    this.router.navigate(['/login']);
  }

}
