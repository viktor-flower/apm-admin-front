// import { environmentBase, EEnvoronmentMode } from 'environment-base';
import { environmentBase, EEnvoronmentMode } from 'src/environments/environment-base';

export const environment = {
  ...environmentBase,
  mode: EEnvoronmentMode.FAKE
};
