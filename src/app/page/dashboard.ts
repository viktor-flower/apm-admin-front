import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-page-component',
  styles: [`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    
    img {
        width: 231px;
        height: 231px;
    }
  `],
  template: `
    <img src="assets/img/logo.jpg">
  `
})
export class DashboardPageComponent {

}
