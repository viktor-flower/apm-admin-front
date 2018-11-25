import {Component, ViewChild} from '@angular/core';
import {AppService} from '../../service/app';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  title = 'Application Policy Manager';
  public isAuthenticatedO: Observable<boolean>;

  constructor(
    private appService: AppService,
    private router: Router
  ) {
    this.isAuthenticatedO = this.appService.getAuthenticationO();
  }

  navigate(route) {
    this.router.navigate(route);
    this.sidenav.close();
  }

  logout() {
    this.appService.logout();
    this.router.navigate(['/login']);
    this.sidenav.close();
  }

}
