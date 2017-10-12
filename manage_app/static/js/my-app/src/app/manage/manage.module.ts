import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ModalModule } from 'angular2-modal';
import { ManageRoutingModule } from './manage.routing.module';

import { SharedModule } from '../common/common.module';
import { LeftNavService } from '../common/left_nav/left_nav.service';

import { ManageComponent } from './manage.component';

import { PermissionConfComponent, PermissionConfDetailComponent } from './permission/permission.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';


@NgModule({
	declarations: [
		ManageComponent,
		
		MenuConfComponent,
		MenuConfDetailComponent,
		
		PermissionConfComponent,
		PermissionConfDetailComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		BrowserAnimationsModule,
		
		ModalModule.forRoot(),
		SharedModule, // 共用控件
		
		ManageRoutingModule, // 根路由器放在最后
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		LeftNavService
	],
	bootstrap: [
		ManageComponent
	]
})
export class ManageModule {
}
