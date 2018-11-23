import {Component} from '@angular/core';
import {AppService} from '../../service/app';

@Component({
  selector: 'app-role-index-page-component',
  template: `
    <h2>Roles</h2>
    <table mat-table [dataSource]="dataSource">

      <!-- Name Column -->
      <ng-container matColumnDef="name" sticky>
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>

      <!-- Star Column -->
      <ng-container matColumnDef="star" stickyEnd>
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-icon>more_vert</mat-icon>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
  `]
})
export class RoleIndexPageComponent {
  displayedColumns = ['name', 'star'];
  dataSource;

  constructor(
    private appService: AppService
  ) {
    this.dataSource = this.appService.getRoleIndexHttp();
  }
}
