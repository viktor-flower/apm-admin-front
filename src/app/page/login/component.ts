import {Component} from '@angular/core';
import {AppService} from '../../service/app';
import {FormBuilder, Validators} from '@angular/forms';
import {UiService} from '../../service/ui';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page-component',
  templateUrl: 'template.html',
  styleUrls: ['style.sass']
})
export class LoginPageComponent {
  public isProcessing = false;
  public form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private uiService: UiService,
    private router: Router
  ) {}

  public click() {
    this.uiService.showMessage('Message', 'info');
  }

  public save() {
    this.isProcessing = true;
    this.appService.login(
      this.form.controls['login'].value,
      this.form.controls['password'].value
    )
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.uiService.showMessage('You have been authenticated successfuly.', 'info');
          this.router.navigate(['/']);
        } else {
          this.uiService.showMessage('Wrong authentication data.', 'info');
        }
      }, null, () => this.isProcessing = false);
  }
}
