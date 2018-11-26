import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {of, Subscription} from 'rxjs';
import {Student} from '../../state/student.model';
import {AppService, IPermission, IRole} from '../../service/app';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../service/ui';

@Component({
  selector: 'app-role-upsert-page-component',
  template: `
    <h2 *ngIf="id === 'new'">Create Role</h2>
    <h2 *ngIf="id !== 'new'">Update Role</h2>
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
export class RoleUpsertPageComponent implements OnInit, OnDestroy {
  initialRole: IRole;
  permissions: IPermission[];
  id: string;
  isProcessing = false;
  private sub: Subscription;
  private form = new FormGroup({});
  private model: IRole = {
    name: '',
    description: '',
    permissionIds: []
  };
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
    const updatedRole = _.assignIn(
      _.clone(this.initialRole),
      _.pick(this.model, ['name', 'description']),
      {
        permissionIds: _(model['permissions'])
          .pickBy((v, k) => !!v)
          .keys()
          .value()
      }
    );
    this.appService.updateRoleItemHttp(updatedRole)
      .subscribe((role) => {
        if (this.id === 'new') {
          this.uiService.showMessage('The role has been created successfully.');
        } else {
          this.uiService.showMessage('The role has been updated successfully.');
        }
        this.router.navigate(['/role', 'index']);
      });
  }

  ngOnInit(): void {
    this.sub = this.appService.getPermissionIndexHttp()
      .pipe(
        flatMap((permissions) => {
          this.permissions = permissions;

          return this.activatedRoute.params;
        }),
        flatMap((params) => {
          this.id = params.id;

          if (this.id === 'new') {
            return of({
              name: '',
              description: '',
              permissionIds: []
            } as IRole);
          }
          if (!!this.id) {
            return this.appService.getRoleItemHttp(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((role) => {
        // Assigns roles objects according to the roleIds field.
        this.initialRole = role;
        this.model = {
          ..._.pick(this.initialRole, ['name', 'description']),
          permissionIds: []
        };
        this.model['permissions'] = _.chain(role.permissionIds)
          .map((id) => [id, true])
          .keyBy(0)
          .mapValues((a) => a[1])
          .value();

        // Generates role form fields.
        const permissionFields = this.permissions.map((permission) => {
          return {
            key: permission.id,
            type: 'checkbox',
            templateOptions: {
              label: permission.name
            },
          };
        });
        const permissionGroup = {
          key: 'permissions',
          wrappers: ['form-field'],
          templateOptions: { label: 'Permissions' },
          fieldGroup: permissionFields
        };
        this.fields.push(permissionGroup);
        this.model = _.clone(this.model);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
