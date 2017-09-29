import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ManageRoutingModule } from './manage.routing.moudle';

import { SharedModule } from '../common/common.module';

import { ManageComponent } from './manage.component';


@NgModule({
	imports: [
		BrowserModule,
		SharedModule,
		ManageRoutingModule, // 根路由器
	],
	declarations: [
		ManageComponent
	],
	providers: [
    
	],
	bootstrap: [
		ManageComponent
	]
})
export class ManageModule {
}
