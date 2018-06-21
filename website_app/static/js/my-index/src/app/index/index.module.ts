import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { A2Edatetimepicker } from '../common/directive/datetimepicker/datetimepicker.module';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ModalModule } from 'angular2-modal';

import { AppConfig } from '../../config/app_config';

import { SharedModule } from '../common/common.module';
import { HeaderService } from '../common/header/header.service';
import { FooterService } from '../common/footer/footer.service';
import { IndexRoutingModule } from './index.routing.module';

import { MainPageComponent } from './index/main_page.component';
import { MainPageService } from './index/main_page.service';

import { ImageSeriesListComponent } from './image_series_list/image_series_list.component';
import { ImageSeriesListService } from './image_series_list/image_series_list.service';

import { ImageListComponent } from './image_list/image_list.component';
import { ImageListService } from './image_list/image_list.service';

import { ImageDetailComponent } from './image_detail/image_detail.component';
import { ImageDetailService } from './image_detail/image_detail.service';

import { FilterImageListComponent } from './filter_image_list/filter_image_list.component';
import { FilterImageListService } from './filter_image_list/filter_image_list.service';

import { IndexComponent } from './index.component';

import { SendAuthEmailComponent, VerifyEmailEffectComponent } from './send_auth_email/send_auth_email.component';
import { SendAuthEmailService } from './send_auth_email/send_auth_email.service';

import { UserPageComponent } from './user_page/user_page.component';
import { UserInfoComponent } from './user_page/user_info/user_info.component';
import { ExchangeCodeComponent } from './user_page/exchange_code/exchange_code.component';
import { UserInfoService } from './user_page/user_info/user_info.service';

import { AuthEmailGuard } from '../common/auth_email/auth_email.service';
import { AuthGuard } from '../common/auth/auth.service';

@NgModule({
	declarations: [
		IndexComponent,
		MainPageComponent,
		ImageSeriesListComponent,
		ImageListComponent,
		ImageDetailComponent,
		FilterImageListComponent,
		SendAuthEmailComponent,
		VerifyEmailEffectComponent,
		UserPageComponent,
		UserInfoComponent,
		ExchangeCodeComponent
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
		
		IndexRoutingModule, // 根路由器放在最后
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AppConfig,
		HeaderService,
		MainPageService,
		FooterService,
		ImageSeriesListService,
		ImageListService,
		ImageDetailService,
		FilterImageListService,
		SendAuthEmailService,
		UserInfoService,
		
		AuthEmailGuard,
		AuthGuard
	],
	bootstrap: [
		IndexComponent
	]
})
export class IndexModule {}
