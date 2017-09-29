import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ManageModule } from './app/manage/manage.module';

platformBrowserDynamic().bootstrapModule(ManageModule);
