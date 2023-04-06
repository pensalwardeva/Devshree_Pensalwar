import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Appmodule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(Appmodule)
  .catch(err => console.error(err));
