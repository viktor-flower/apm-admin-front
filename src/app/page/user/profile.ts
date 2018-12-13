import {Component} from '@angular/core';
import {SessionQuery} from '../../state/session/query';
import {SessionState} from '../../state/session/store';
import {AppService} from '../../service/app';

@Component({
  selector: 'app-user-profile-page-component',
  template: `
    <h2>Profile page</h2>
    <div><b>token</b> - {{ session.token }}</div>
    <div><b>id</b> - {{ session.user._id }}</div>
    <div><b>name</b> - {{ session.user.name }}</div>
    <h3>Roles</h3>
    <div *ngFor="let role of session.user.roles">
      <h4>{{ role.title }}</h4>
      <div><b>name</b> - {{ role.name }}</div>
      <div><b>id</b> - {{ role._id }}</div>
      <div><h5>Permissions</h5></div>
      <div *ngFor="let permission of role.permissions">
        <h6>{{ permission.title }}</h6>
        <div><b>id</b> - {{ permission._id }}</div>
        <div><b>name</b> - {{ permission.name }}</div>
      </div>
    </div>
  `
})
export class UserProfilePageComponent {
  public session: SessionState;
  constructor(
    private appService: AppService
  ) {
    this.appService.session$
      .subscribe((session: SessionState) => {
        this.session = session;
      });
  }
}
