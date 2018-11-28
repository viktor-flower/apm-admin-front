import {ID, guid} from '@datorama/akita';

export interface IPermission {
  id: ID;
  name: string;
  description: string;
}

export function createPermission({
  id = guid(),
  name = '',
  description = ''
}: Partial<IPermission>): IPermission {
  return {
    id,
    name,
    description
  };
}
