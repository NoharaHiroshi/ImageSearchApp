import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { A2Edatetimepicker } from '../common/directive/datetimepicker/datetimepicker.module';

import { ModalModule } from 'angular2-modal';
import { SharedModule } from '../common/common.module';

import { ManageRoutingModule } from './manage.routing.module';

import { FuncModule } from './func/func.module';
import { MenuModule } from './menu/menu.module';
import { MenuFuncModule } from './menu_func/menu_func.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user_role/user_role.module';
import { ImageModule } from './image/image.module';

import { DashboardConfComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';

@NgModule({
	declarations: [
		DashboardConfComponent,
	],
	imports: [
		CommonModule,
        FileUploadModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		BrowserAnimationsModule,
		
		A2Edatetimepicker,
		ModalModule.forRoot(),
		SharedModule, // 共用控件
		
		FuncModule, // 功能模块
		MenuModule, // 菜单模块
		MenuFuncModule, // 菜单功能模块
		RoleModule, // 权限模块
		UserRoleModule, // 用户权限模块
		ImageModule, // 图片模块
		
		ManageRoutingModule, // 根路由器放在最后
	],
	providers: [
		DashboardService,
	]
})
export class ManageModule {
}
