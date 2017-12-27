import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { A2Edatetimepicker } from '../common/directive/datetimepicker/datetimepicker.module';

import { WebsiteRoutingModule } from './website.routing.module';

import { SharedModule } from '../common/common.module';
import { LeftNavService } from '../common/left_nav/left_nav.service';
import { HeaderService } from '../common/header/header.service';

import { WebsiteMenuConfComponent, WebsiteMenuConfDetailComponent } from './menu/website_menu.component';

import { WebsiteMenuService } from './menu/website_menu.service';

import { WebsiteComponent } from './website.component';

@NgModule({
	declarations: [
		WebsiteComponent,
		WebsiteMenuConfComponent,
		WebsiteMenuConfDetailComponent
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
		
		WebsiteRoutingModule, // 根路由器放在最后
	],
	providers: [
		// { provide: LocationStrategy, useClass: HashLocationStrategy },
		HeaderService,
		LeftNavService,
		WebsiteMenuService
	],
	bootstrap: [
		WebsiteComponent
	]
})
export class WebsiteModule {
}
