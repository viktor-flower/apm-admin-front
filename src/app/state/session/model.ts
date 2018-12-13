// export interface IPermission {
//   _id?: string;
//   name: string;
//   title?: string;
//   system?: boolean;
//   description?: string;
// }
//
// export interface IRole {
//   _id?: string;
//   name: string;
//   title?: string;
//   system: boolean;
//   description?: string;
//   permissions?: IPermission[];
// }
//
// export interface IUser {
//   _id?: string;
//   name: string;
//   roles?: IRole[];
// }

import {IUser} from '../../service/app';

export interface ISession {
  token: string;
  user: IUser;
}

export function createSession({
  token = '', user = null
}: Partial<ISession>) {
  return {
    token,
    user
  };
}
