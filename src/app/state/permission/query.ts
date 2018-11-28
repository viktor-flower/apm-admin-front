import {QueryEntity} from '@datorama/akita';
import {PermissionState} from './store';
import {IPermission} from '../../service/app';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionQuery extends QueryEntity<PermissionState, IPermission> {
}
