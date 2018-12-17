import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {forkJoin, of, Subscription} from 'rxjs';
import {AppService, IPermission, IRole} from '../../service/app';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, take, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../service/ui';

@Component({
  selector: 'app-role-upsert-page-component',
  template: `
    <h2 *ngIf="id === 'new'">Create Role</h2>
    <h2 *ngIf="id !== 'new'">Update Role</h2>
    <form *ngIf="formIsBuilt" [formGroup]="form" (ngSubmit)="submit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model">
        <div class="action-controls">
          <button
            class="submit"
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="form.invalid || isProcessing">Submit</button>
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
  // initialRole: IRole;
  initialRole: any ;
  permissions: IPermission[];
  _id: string;
  isProcessing = false;
  private sub: Subscription;
  private form = new FormGroup({});
  private formIsBuilt = false;
  // @todo Redisign.
  //private model: PartialDeep<IRole> = {
  private model: any = {
    name: '',
    title: '',
    description: '',
    permissions: {}
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
      key: 'title',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Title',
        placeholder: 'Title',
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
        required: false,
      }
    }
  ];

  constructor(
    private appService: AppService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  submit(model, done = () => {}) {
    const updatedRole: IRole = {
      ..._.clone(this.initialRole) as IRole,
      ..._.pick(this.model, 'name', 'title', 'description') as IRole,
      permissionIds: _(this.model.permissions)
        .toPairs()
        .filter(a => !!a[1])
        .map(a => a[0])
        .value() as string[]
    };

    if (this._id === 'new') {
      this.appService.createRoleItemHttp(updatedRole)
        .subscribe(() => {
          this.uiService.showMessage('The role has been created successfully.');
          this.router.navigate(['/role', 'index']);
          done();
        });
    } else {
      this.appService.updateRoleItemHttp(updatedRole)
        .subscribe(() => {
          this.uiService.showMessage('The role has been updated successfully.');
          this.router.navigate(['/role', 'index']);
          done();
        });
    }
  }

  ngOnInit(): void {
    this.sub = forkJoin(
      this.activatedRoute.params
        .pipe(
          flatMap((params) => {
            this._id = params._id;

            if (this._id === 'new') {
              return of({
                name: '',
                title: '',
                description: '',
                permissionIds: [],
                permissions: []
              } as IRole);
            }
            if (!!this._id) {
              return this.appService.getRoleItemHttp(this._id)
            } else {
              return of(null);
            }
          }),
          take(1)
        ),
      this.appService.getPermissionIndexHttp().pipe(take(1))
    )
      .subscribe(([role, permissions]) => {
        this.initialRole = role;
        this.permissions = permissions;

        // Generates role form fields.
        const permissionFields = this.permissions.map((permission) => {
          return {
            key: permission._id,
            type: 'checkbox',
            templateOptions: {
              label: permission.title
            },
          };
        });
        const permissionGroup = {
          key: 'permissions',
          wrappers: ['form-field'],
          templateOptions: { label: 'Permissions' },
          fieldGroup: permissionFields,
          fieldGroupClassName: 'permission-group'
        };
        this.fields.push(permissionGroup);

        // Sets the form model.
        this.model = _.pick(this.initialRole, 'name', 'title', 'description');
        this.model.permissions = _(this.permissions.map((permission) => {
          return [permission._id, !!this.initialRole['permissions'].find(rolePermission => rolePermission._id === permission._id)]
        })).keyBy(0).mapValues(a => a[1]).value();

        this.formIsBuilt = true;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
