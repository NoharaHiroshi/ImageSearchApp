import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

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
import { UserRoleConfComponent, UserRoleConfDetailComponent } from './user_role/user_role.component';
import { SimpleDemoComponent } from './image/demo.component';

import { FuncService } from './func/func.service';
import { MenuService } from './menu/menu.service';
import { MenuFuncService } from './menu_func/menu_func.service';
import { RoleService } from './role/role.service';
import { UserRoleService } from './user_role/user_role.service';

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
		RolePermissionConfDetailComponent,
		
		UserRoleConfComponent,
		UserRoleConfDetailComponent,
		
		SimpleDemoComponent
	],
	imports: [
		CommonModule,
        FileUploadModule,
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
		RoleService,
		UserRoleService
	],
	bootstrap: [
		ManageComponent
	]
})
export class ManageModule {
}
