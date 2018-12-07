import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {of, Subscription} from 'rxjs';
import {AppService, IPermission} from '../../service/app';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../service/ui';
import {PartialDeep} from 'lodash';

@Component({
  selector: 'app-permission-upsert-page-component',
  template: `
    <h2 *ngIf="id === 'new'">Create Permission</h2>
    <h2 *ngIf="id !== 'new'">Update Permission</h2>
    <form [formGroup]="form" (ngSubmit)="submit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model">
        <div class="action-controls">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="submit"
            [disabled]="form.invalid || isProcessing">
              Submit
          </button>
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
  _id: string;
  isProcessing = false;
  private sub: Subscription;
  private form = new FormGroup({});
  private model: PartialDeep<IPermission> = {
    name: '',
    title: '',
    description: '',
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
    const updatedPermission = {
      ..._.clone(this.initialPermission),
      ..._.pick(this.model, 'name', 'title', 'description')
    };

    if (this._id === 'new') {
      this.appService.createPermissionItemHttp(updatedPermission)
        .subscribe(() => {
          this.router.navigate(['/permission', 'index']);
          this.uiService.showMessage('The permission has been created successfully.');
          done();
        });
    } else {
      this.appService.updatePermissionItemHttp(updatedPermission)
        .subscribe(() => {
          this.router.navigate(['/permission', 'index']);
          this.uiService.showMessage('The permission has been updated successfully.');
          done();
        });
    }
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params
      .pipe(
        flatMap((params) => {
          this._id = params._id;

          if (this._id === 'new') {
            return of({
              name: '',
              description: '',
            } as IPermission);
          }
          if (!!this._id) {
            return this.appService.getPermissionItemHttp(this._id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((permission) => {
        this.initialPermission = permission;
        this.model = _.pick(this.initialPermission, 'name', 'title', 'description');
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
