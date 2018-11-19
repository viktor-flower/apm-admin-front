import {Component} from '@angular/core';
import {AppService} from '../service/app';

@Component({
  selector: 'app-login-page-component',
  template: `
    template
  `
})
export class LoginPageComponent {
  constructor(
    private appService: AppService
  ) {}
}
