import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.moudle';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { CommonModule } from './common';
import { RouterModule } from '@angular/router';

const APP_PROVIDERS = [];

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonModule, // 共用组件：header、footer
    AppRoutingModule, // 根路由器
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ...APP_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
