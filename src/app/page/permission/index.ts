import {Component} from '@angular/core';
import {AppService} from '../../service/app';

@Component({
  selector: 'app-permission-index-page-component',
  template: `
    <h2>Permissions</h2>
    <table mat-table [dataSource]="dataSource">

      <!-- Name Column -->
      <ng-container matColumnDef="name" sticky>
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element"> {{element.name}}</td>
      </ng-container>

      <!-- Star Column -->
      <ng-container matColumnDef="star" stickyEnd>
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-menu #menu="matMenu">
            <button
              mat-menu-item
              [routerLink]="['/permission', 'upsert', element.id]"
              class="edit-menu-item">Edit</button>
          </mat-menu>

          <button
            mat-icon-button
            [ngClass]="['group-menu-item', element.id + '-group-menu-item']"
            [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <div class="fixed">
      <button mat-fab color="accent"  [matMenuTriggerFor]="localMenu" class="local-menu"><mat-icon>menu</mat-icon></button>
    </div>

    <mat-menu #localMenu="matMenu">
      <button mat-menu-item [routerLink]="['/permission', 'upsert', 'new']" class="new-menu-item">New</button>
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
export class PermissionIndexPageComponent {
  displayedColumns = ['name', 'star'];
  dataSource;

  constructor(
    private appService: AppService
  ) {
    this.dataSource = this.appService.getPermissionIndexHttp();
  }
}
