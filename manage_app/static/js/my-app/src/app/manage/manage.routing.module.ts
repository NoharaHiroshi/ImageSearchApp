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
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(manage_routes) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}