import {Component} from '@angular/core';
import {AppService, IRole, IUser} from '../../service/app';
import {flatMap} from 'tslint/lib/utils';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';

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
        <td mat-cell *matCellDef="let element"> {{element.roles}} </td>
      </ng-container>

      <!-- Star Column -->
      <ng-container matColumnDef="star" stickyEnd>
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <mat-menu #menu="matMenu">
            <button mat-menu-item [routerLink]="['/user', 'upsert', element.id]">Edit</button>
          </mat-menu>

          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
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
  displayedColumns = ['name', 'roles', 'star'];
  dataSource;

  constructor(
    private appService: AppService
  ) {

    this.dataSource = this.appService.getUserIndexHttp();

    // v3
    // this.dataSource = forkJoin(
    //   this.appService.getUserIndexHttp(),
    //   this.appService.getRoleIndexHttp()
    // )
    //   .pipe((a) => {
    //     let users = a[0];
    //     //let roles = a[1];
    //
    //     console.log(a);
    //
    //     return users;
    //   });

    // v2
    // this.dataSource = this.appService.getUserIndexHttp()
    //   .pipe<IUser[]>(
    //     flatMap((users) => {
    //       return this.appService.getRoleIndexHttp()
    //         .pipe<IUser[]>(
    //           map<IRole[], IUser[]>((roles) => {
    //             users;
    //           });
    //         );
    //     })
    //   );
  }
}

// .pipe(
//   map((roles) => {
//     let kRoles = _.keyBy(roles, 'id');
//     return users.map((user) => {
//       user['roles'] = user.roleIds.map((id) => kRoles[id]!.name).join(', ');
//
//       return user;
//     });
//   })
