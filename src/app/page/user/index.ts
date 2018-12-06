import {Component} from '@angular/core';
import {AppService, IUser} from '../../service/app';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import * as _ from 'lodash';

export interface IDUser extends IUser {
  roleName: string[];
}

@Component({
  selector: 'app-user-index-page-component',
  template: `
    <h2>Users</h2>
    <table mat-table [dataSource]="dataSource">

      <!-- Name Column -->
      <ng-container matColumnDef="name" sticky>
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <!-- EMail Column -->
      <ng-container matColumnDef="roles" sticky>
        <th mat-header-cell *matHeaderCellDef>Roles</th>
        <td mat-cell *matCellDef="let element"> {{element.roleNames.join(', ')}} </td>
      </ng-container>

      <!-- Star Column -->
      <ng-container matColumnDef="star" stickyEnd>
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-menu #menu="matMenu">
            <button
              mat-menu-item
              class="edit-menu-item"
              [routerLink]="['/user', 'upsert', element.id]">Edit</button>
          </mat-menu>

          <button
            [ngClass]="['group-menu-item', element.id + '-group-menu-item']"
            mat-icon-button
            [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <div class="fixed">
      <button
        class="local-menu"
        mat-fab color="accent"
        [matMenuTriggerFor]="localMenu"><mat-icon>menu</mat-icon></button>
    </div>

    <mat-menu #localMenu="matMenu">
      <button
        mat-menu-item
        class="new-menu-item"
        [routerLink]="['/user', 'upsert', 'new']">New</button>
    </mat-menu>
  `,
  styles: [`
    .fixed {
        position: fixed;
        top: 37px;
        right: 37px;
        z-index: 1;
    }
  `]
})
export class UserIndexPageComponent {
  displayedColumns = ['name', 'roles', 'star'];
  dataSource;

  constructor(
    private appService: AppService
  ) {
    this.dataSource = this.appService.getUserIndexHttp();
  }
}
