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
import { HotSearchConfComponent, HotSearchConfDetailComponent } from './hot_search/hot_search.component';
import { ColumnConfComponent, ColumnConfDetailComponent, ColumnConfSetDetailComponent } from './column/column.component';
import { BannerConfComponent, BannerConfDetailComponent } from './banner/banner.component';
import { CustomerConfComponent, CustomerConfDetailComponent, CustomerDiscountConfDetailComponent } from './customer/customer.component';
import { DiscountConfComponent, DiscountConfDetailComponent } from './discount/discount.component';
import { WebsiteConfComponent } from './website/website.component';

import { WebsiteMenuService } from './menu/website_menu.service';
import { HotSearchService } from './hot_search/hot_search.service';
import { ColumnService } from './column/column.service';
import { BannerService } from './banner/banner.service';
import { CustomerService } from './customer/customer.service';
import { DiscountService } from './discount/discount.service';
import { WebsiteInfoService } from './website/website.service';

import { WebsiteComponent } from './website.component';
import { AuthGuard } from '../common/auth/auth.service';

@NgModule({
	declarations: [
		WebsiteComponent,
		WebsiteMenuConfComponent,
		WebsiteMenuConfDetailComponent,
		HotSearchConfComponent,
		HotSearchConfDetailComponent,
		ColumnConfComponent,
		ColumnConfDetailComponent,
		ColumnConfSetDetailComponent,
		BannerConfComponent, 
		BannerConfDetailComponent, 
		CustomerConfComponent, 
		CustomerConfDetailComponent,
		CustomerDiscountConfDetailComponent,
		DiscountConfComponent, 
		DiscountConfDetailComponent,
		WebsiteConfComponent
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
		HeaderService,
		LeftNavService,
		
		WebsiteMenuService,
		HotSearchService,
		ColumnService,
		BannerService,
		CustomerService,
		DiscountService,
		WebsiteInfoService,
		
		AuthGuard
	]
})
export class WebsiteModule {
}
