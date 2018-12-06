import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {EEnvoronmentMode, environmentBase} from './environments/environment-base';

if (environmentBase.mode === EEnvoronmentMode.PRODUCTION) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
