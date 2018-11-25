import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {of, Subscription} from 'rxjs';
import {AppService, IPermission, IRole, IRole} from '../../service/app';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../service/ui';

@Component({
  selector: 'app-permission-upsert-page-component',
  template: `
    <h2 *ngIf="id === 'new'">Create Permissson</h2>
    <h2 *ngIf="id !== 'new'">Update Permission</h2>
    <form [formGroup]="form" (ngSubmit)="submit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model">
        <div class="action-controls">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || isProcessing">Submit</button>
        </div>
      </formly-form>
    </form>
  `,
  styles: [`
    :host {
      margin: 23px;
      display: flex;
      flex-direction: column;
      width: calc(100% - 46px);
      height: calc(100% - 128px);
    }

    form {
      width: 100%;
    }
  `]
})
export class PermissionUpsertPageComponent implements OnInit, OnDestroy {
  initialPermission: IPermission;
  permissions: IPermission[];
  id: string;
  isProcessing = false;
  private sub: Subscription;
  private form = new FormGroup({});
  private model = { email: '' };
  private fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        placeholder: 'Name',
        required: true,
      }
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Description',
        placeholder: 'Description',
        required: true,
      }
    }
  ];

  constructor(
    private appService: AppService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  submit(model) {
    const updatedPermission = _.assignIn(
      _.clone(this.initialPermission),
      _.pick(this.model, ['name', 'description'])
    );
    this.appService.updatePermissionItemHttp(updatedPermission)
      .subscribe((permission) => {
        if (this.id === 'new') {
          this.uiService.showMessage('The permission has been created successfully.');
        } else {
          this.uiService.showMessage('The permission has been updated successfully.');
        }
        this.router.navigate(['/permission', 'index']);
      });
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params
      .pipe(
        flatMap((params) => {
          this.id = params.id;

          if (this.id === 'new') {
            return of({
              name: '',
              description: '',
            } as IPermission);
          }
          if (!!this.id) {
            return this.appService.getPermissionItemHttp(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((permission) => {
        // Assigns roles objects according to the roleIds field.
        this.initialPermission = permission;
        this.model = _.pick(this.initialPermission, ['name', 'description']);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
