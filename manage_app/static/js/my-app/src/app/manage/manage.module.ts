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
import { HeaderService } from '../common/header/header.service';

import { ManageComponent } from './manage.component';

import { FuncConfComponent, FuncConfDetailComponent } from './func/func.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';
import { MenuFuncConfComponent, MenuFuncConfDetailComponent } from './menu_func/menu_func.component';
import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent } from './role/role.component';

import { FuncService } from './func/func.service';
import { MenuService } from './menu/menu.service';
import { MenuFuncService } from './menu_func/menu_func.service';
import { RoleService } from './role/role.service';

@NgModule({
	declarations: [
		ManageComponent,
		
		MenuConfComponent,
		MenuConfDetailComponent,
		
		FuncConfComponent,
		FuncConfDetailComponent,
		
		MenuFuncConfComponent,
		MenuFuncConfDetailComponent,
		
		RoleConfComponent,
		RoleConfDetailComponent,
		RolePermissionConfDetailComponent
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
		HeaderService,
		LeftNavService,
		FuncService,
		MenuService,
		MenuFuncService,
		RoleService
	],
	bootstrap: [
		ManageComponent
	]
})
export class ManageModule {
}
