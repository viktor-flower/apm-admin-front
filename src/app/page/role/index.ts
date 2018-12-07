import {Component} from '@angular/core';
import {AppService} from '../../service/app';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-role-index-page-component',
  template: `
    <h2>Roles</h2>
    <table mat-table [dataSource]="dataSource">

      <!-- Name Column -->
      <ng-container matColumnDef="name" sticky>
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.title}} </td>
      </ng-container>

      <!-- Permissions Column -->
      <ng-container matColumnDef="permissions" sticky>
        <th mat-header-cell *matHeaderCellDef>Permissions</th>
        <td mat-cell *matCellDef="let element"> {{element.permissionTitles.join(', ')}} </td>
      </ng-container>


      <!-- Star Column -->
      <ng-container matColumnDef="star" stickyEnd>
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-menu #menu="matMenu">
            <button
              mat-menu-item
              class="edit-menu-item"
              [routerLink]="['/role', 'upsert', element._id]">Edit</button>
          </mat-menu>

          <button
            mat-icon-button
            [ngClass]="['group-menu-item', element._id + '-group-menu-item']"
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
        [routerLink]="['/role', 'upsert', 'new']"
        class="new-menu-item">New</button>
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
export class RoleIndexPageComponent {
  displayedColumns = ['name', 'permissions', 'star'];
  dataSource;

  constructor(
    private appService: AppService
  ) {
    this.dataSource = this.appService.getRoleIndexHttp()
      .pipe(
        map((roles) => {
          return roles.map((role) => {
            role['permissionTitles'] = role['permissions'].map((p) => p.title);

            return role;
          });
        })
      );
  }
}
