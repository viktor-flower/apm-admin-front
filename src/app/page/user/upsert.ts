import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {forkJoin, of, Subscription} from 'rxjs';
import {AppService, IRole, IUser} from '../../service/app';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, take} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../service/ui';

@Component({
  selector: 'app-user-upsert-page-component',
  template: `
    <h2 *ngIf="id === 'new'">Create User</h2>
    <h2 *ngIf="id !== 'new'">Update User</h2>
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
export class UserUpsertPageComponent implements OnInit, OnDestroy {
  initialUser: IUser;
  roles: IRole[];
  _id: string;
  isProcessing = false;
  private sub: Subscription;
  private form = new FormGroup({});
  private formIsBuilt = false;
  // private model: Partial<IUser> = {
  private model: any = {
    name: '',
    description: '',
    roles:[]
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
        type: 'description',
        label: 'Description',
        placeholder: 'Description',
        required: true,
      }
    },
  ];

  constructor(
    private appService: AppService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  submit(model, done = () => {}) {
    const updatedUser: IUser = {
      ..._.pick(this.initialUser, 'system') as IUser,
      ..._.pick(this.model, 'name', 'description') as IUser,
      roleIds: _(this.model.roles)
        .toPairs()
        .filter(a => !!a[1])
        .map(a => a[0])
        .value()
    };

    if (this._id === 'new') {
      this.appService.createUserItemHttp(updatedUser)
        .subscribe(() => {
          this.uiService.showMessage('The user has been created successfully.');
          this.router.navigate(['/user', 'index']);
          done();
        });
    } else {
      updatedUser._id = this._id;
      this.appService.updateUserItemHttp(updatedUser)
        .subscribe(() => {
          this.uiService.showMessage('The user has been updated successfully.');
          this.router.navigate(['/user', 'index']);
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
                description: '',
                roleIds: [],
                roles: []
              } as IUser);
            }
            if (!!this._id) {
              return this.appService.getUserItemHttp(this._id);
            } else {
              return of(null);
            }
          }),
          take(1)
        ),
      this.appService.getRoleIndexHttp().pipe(take(1))
    )
      .subscribe(([user, roles]) => {
        this.initialUser = user;
        this.roles = roles;

        // Generates role form fields.
        const roleFields = this.roles.map((role) => {
          return {
            key: role._id,
            type: 'checkbox',
            templateOptions: {
              label: role.title
            },
          };
        });
        const roleGroup = {
          key: 'roles',
          wrappers: ['form-field'],
          templateOptions: { label: 'Roles' },
          fieldGroup: roleFields,
          fieldGroupClassName: 'permission-group'
        };
        this.fields.push(roleGroup);

        // Sets the form model.
        this.model = _.pick(this.initialUser, 'name', 'description');
        this.model.roles = _(this.roles.map((role) => {
          return [role._id, !!this.initialUser['roles'].find(userRole => userRole._id === role._id)]
        })).keyBy(0).mapValues(a => a[1]).value();

        this.formIsBuilt = true;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
