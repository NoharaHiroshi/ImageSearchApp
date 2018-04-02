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

import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { LoginService } from './common/login/login.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
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
		AppConfig,
		LoginService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	constructor(config: AppConfig, router: Router) {
		console.log('user');
		console.log(JSON.stringify(config.user));
		console.log('router');
		console.log(JSON.stringify(router.config, undefined, 2));
	}
}
