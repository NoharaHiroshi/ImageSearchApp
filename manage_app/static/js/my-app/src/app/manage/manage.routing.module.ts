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
	{ 
		path: 'manage',
		children: [
			{ path: '',  redirectTo: 'dashboard_conf', pathMatch: 'full' },
			{ path: 'dashboard_conf', component: DashboardConfComponent },
			
			{ path: 'image_upload', component: ImageUploadComponent },
			{ path: 'image_conf', component: ImageConfComponent },
			
			{ path: 'image_series_conf', component: ImageSeriesConfComponent },
			{ path: 'image_series_conf/detail/:id', component: ImageSeriesConfDetailComponent },
			{ path: 'image_series_conf/add', component: ImageSeriesConfDetailComponent },
			{ path: 'image_series_conf/set/:id', component: ImageSeriesSetComponent },
			
			{ path: 'image_series_category_conf', component: ImageSeriesCategoryConfComponent },
			{ path: 'image_series_category_conf/detail/:id', component: ImageSeriesCategoryConfDetailComponent },
			{ path: 'image_series_category_conf/add', component: ImageSeriesCategoryConfDetailComponent },
			{ path: 'image_series_category_conf/set/:id', component: ImageSeriesCategoryConfSetDetailComponent },
			
			{ path: 'image_tag_conf', component: ImageTagConfComponent },
			{ path: 'image_tag_conf/detail/:id', component: ImageTagConfDetailComponent },
			{ path: 'image_tag_conf/add', component: ImageTagConfDetailComponent },
			{ path: 'image_tag_conf/set/:id', component: ImageTagSetComponent },
			{ path: 'image_demo_conf', component: ImageDemoConfComponent },
			
			{ path: 'image_recommend_tag_conf', component: ImageRecommendTagConfComponent },
			{ path: 'image_recommend_tag_conf/detail/:id', component: ImageRecommendTagConfDetailComponent },
			{ path: 'image_recommend_tag_conf/add', component: ImageRecommendTagConfDetailComponent },
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(manage_routes) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}