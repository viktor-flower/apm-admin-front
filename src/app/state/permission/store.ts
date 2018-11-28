import {EntityState, StoreConfig, EntityStore} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {IPermission} from './model';

export interface PermissionState extends  EntityState<IPermission> {}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'permissions'
})
export class PermissionStore extends EntityStore<PermissionState, IPermission> {
  constructor() {
    super();
  }
}
