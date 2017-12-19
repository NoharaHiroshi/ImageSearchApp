import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { WebsiteModule } from './app/website/website.module';

platformBrowserDynamic().bootstrapModule(WebsiteModule);
