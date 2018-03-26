import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { A2Edatetimepicker } from './common/directive/datetimepicker/datetimepicker.module';
import { ModalModule } from 'angular2-modal';

import { AppConfig } from './config/app_config';
import { SharedModule } from './common/common.module';
import { ManageModule } from './manage/manage.module';
import { WebsiteModule } from './website/website.module';

import { AppRoutingModule } from './app.routing.module';

import { LeftNavService } from './common/left_nav/left_nav.service';
import { HeaderService } from './common/header/header.service';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
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
		
		ManageModule, // 后台管理模块
		WebsiteModule, // 网站管理模块
		
		AppRoutingModule, // 根路由器放在最后
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		HeaderService,
		LeftNavService,
		
		AppConfig
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	constructor(router: Router) {
		console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
	}
}
