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
import { ManageComponent } from './manage.component';

import { LeftNavService } from '../common/left_nav/left_nav.service';
import { HeaderService } from '../common/header/header.service';

import { DashboardConfComponent } from './dashboard/dashboard.component';
import { FuncConfComponent, FuncConfDetailComponent } from './func/func.component';

import { DashboardService } from './dashboard/dashboard.service';
import { FuncService } from './func/func.service';

@NgModule({
	declarations: [
		ManageComponent,
		
		DashboardConfComponent,
		
		FuncConfComponent,
		FuncConfDetailComponent
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
		
		ManageRoutingModule, // 根路由器放在最后
	],
	providers: [
		DashboardService,
		HeaderService,
		LeftNavService,
		FuncService
	]
})
export class ManageModule {
}
