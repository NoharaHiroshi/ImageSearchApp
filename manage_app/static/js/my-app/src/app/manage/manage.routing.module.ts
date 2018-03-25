import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DashboardConfComponent } from './dashboard/dashboard.component';

import { ImageUploadComponent } from './image/upload_image.component';
import { ImageConfComponent } from './image/image.component';
import { ImageSeriesConfComponent, ImageSeriesConfDetailComponent, ImageSeriesSetComponent } from './image/image_series.component';
import { ImageTagConfComponent, ImageTagConfDetailComponent, ImageTagSetComponent } from './image/image_tag.component';
import { ImageDemoConfComponent } from './image/image_demo.component';
import { ImageSeriesCategoryConfComponent, ImageSeriesCategoryConfDetailComponent, ImageSeriesCategoryConfSetDetailComponent} from './image/image_series_category.component';
import { ImageRecommendTagConfComponent, ImageRecommendTagConfDetailComponent } from './image/image_recommend_tag.component';

// 管理模块路由器
const manage_routes: Routes = [
		{ path: 'manage',  redirectTo: 'manage/dashboard_conf', pathMatch: 'full' },
		{ path: 'manage/dashboard_conf', component: DashboardConfComponent },
		
		{ path: 'manage/image_upload', component: ImageUploadComponent },
		{ path: 'manage/image_conf', component: ImageConfComponent },
		
		{ path: 'manage/image_series_conf', component: ImageSeriesConfComponent },
		{ path: 'manage/image_series_conf/detail/:id', component: ImageSeriesConfDetailComponent },
		{ path: 'manage/image_series_conf/add', component: ImageSeriesConfDetailComponent },
		{ path: 'manage/image_series_conf/set/:id', component: ImageSeriesSetComponent },
		
		{ path: 'manage/image_series_category_conf', component: ImageSeriesCategoryConfComponent },
		{ path: 'manage/image_series_category_conf/detail/:id', component: ImageSeriesCategoryConfDetailComponent },
		{ path: 'manage/image_series_category_conf/add', component: ImageSeriesCategoryConfDetailComponent },
		{ path: 'manage/image_series_category_conf/set/:id', component: ImageSeriesCategoryConfSetDetailComponent },
		
		{ path: 'manage/image_tag_conf', component: ImageTagConfComponent },
		{ path: 'manage/image_tag_conf/detail/:id', component: ImageTagConfDetailComponent },
		{ path: 'manage/image_tag_conf/add', component: ImageTagConfDetailComponent },
		{ path: 'manage/image_tag_conf/set/:id', component: ImageTagSetComponent },
		{ path: 'manage/image_demo_conf', component: ImageDemoConfComponent },
		
		{ path: 'manage/image_recommend_tag_conf', component: ImageRecommendTagConfComponent },
		{ path: 'manage/image_recommend_tag_conf/detail/:id', component: ImageRecommendTagConfDetailComponent },
		{ path: 'manage/image_recommend_tag_conf/add', component: ImageRecommendTagConfDetailComponent },
];

@NgModule({
	imports: [ RouterModule.forChild(manage_routes) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}