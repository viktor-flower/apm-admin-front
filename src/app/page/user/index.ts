import {Component} from '@angular/core';
import {AppService} from '../../service/app';

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
      <ng-container matColumnDef="email" sticky>
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let element"> {{element.email}} </td>
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
export class UserIndexPageComponent {
  displayedColumns = ['name', 'email', 'star'];
  dataSource;

  constructor(
    private appService: AppService
  ) {
    this.dataSource = this.appService.getUserIndexHttp();
  }
}
