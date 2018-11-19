import {Component} from '@angular/core';
import {AppService} from '../../service/app';
import {FormBuilder, Validators} from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  public save() {
    this.appService.login(
      this.form.controls['login'].value,
      this.form.controls['password'].value
    )
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          // @todo fisnish.
        } else {
          // @todo finish.
        }
      }, null, () => this.isProcessing = false);
  }
}
