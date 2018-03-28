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
import { AuthGuard } from '../common/auth/auth.service';

import { DashboardConfComponent } from './dashboard/dashboard.component';
import { FuncConfComponent, FuncConfDetailComponent } from './func/func.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';
import { MenuFuncConfComponent, MenuFuncConfDetailComponent } from './menu_func/menu_func.component';
import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent } from './role/role.component';
import { UserRoleConfComponent, UserRoleConfDetailComponent } from './user_role/user_role.component';

import { ImageUploadComponent } from './image/upload_image.component';
import { ImageConfComponent } from './image/image.component';
import { ImageSeriesConfComponent, ImageSeriesConfDetailComponent, ImageSeriesSetComponent } from './image/image_series.component';
import { ImageSeriesCategoryConfComponent, ImageSeriesCategoryConfDetailComponent, ImageSeriesCategoryConfSetDetailComponent } from './image/image_series_category.component';
import { ImageTagConfComponent, ImageTagConfDetailComponent, ImageTagSetComponent } from './image/image_tag.component';
import { ImageDemoConfComponent } from './image/image_demo.component';
import { ImageRecommendTagConfComponent, ImageRecommendTagConfDetailComponent } from './image/image_recommend_tag.component';

import { DashboardService } from './dashboard/dashboard.service';
import { FuncService } from './func/func.service';
import { MenuService } from './menu/menu.service';
import { MenuFuncService } from './menu_func/menu_func.service';
import { RoleService } from './role/role.service';
import { UserRoleService } from './user_role/user_role.service';

import { ImageService } from './image/image.service';
import { ImageSeriesService } from './image/image_series.service';
import { ImageSeriesCategoryService } from './image/image_series_category.service';
import { ImageTagService } from './image/image_tag.service';
import { ImageRecommendTagService } from './image/image_recommend_tag.service';

@NgModule({
	declarations: [
		ManageComponent,
		
		DashboardConfComponent,
		
		FuncConfComponent,
		FuncConfDetailComponent,
		
		MenuConfComponent,
		MenuConfDetailComponent,
		
		MenuFuncConfComponent,
		MenuFuncConfDetailComponent,
		
		RoleConfComponent,
		RoleConfDetailComponent,
		RolePermissionConfDetailComponent,
		
		UserRoleConfComponent,
		UserRoleConfDetailComponent,
		
		ImageUploadComponent,
		ImageConfComponent,
		
		ImageSeriesConfComponent, 
		ImageSeriesConfDetailComponent, 
		ImageSeriesSetComponent,
		
		ImageTagConfComponent, 
		ImageTagConfDetailComponent, 
		ImageTagSetComponent,
		
		ImageDemoConfComponent,
		
		ImageRecommendTagConfComponent,
		ImageRecommendTagConfDetailComponent,
		
		ImageSeriesCategoryConfComponent, 
		ImageSeriesCategoryConfDetailComponent,
		ImageSeriesCategoryConfSetDetailComponent
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
		FuncService,
		MenuService,
		MenuFuncService,
		RoleService,
		UserRoleService,
		
		ImageService,
		ImageRecommendTagService,
		ImageSeriesService,
		ImageSeriesCategoryService,
		ImageTagService,
		
		AuthGuard
	]
})
export class ManageModule {
}
