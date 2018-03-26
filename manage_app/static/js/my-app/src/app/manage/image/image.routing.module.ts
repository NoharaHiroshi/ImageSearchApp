import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ImageUploadComponent } from './upload_image.component';
import { ImageConfComponent } from './image.component';
import { ImageSeriesConfComponent, ImageSeriesConfDetailComponent, ImageSeriesSetComponent } from './image_series.component';
import { ImageTagConfComponent, ImageTagConfDetailComponent, ImageTagSetComponent } from './image_tag.component';
import { ImageDemoConfComponent } from './image_demo.component';
import { ImageSeriesCategoryConfComponent, ImageSeriesCategoryConfDetailComponent, ImageSeriesCategoryConfSetDetailComponent} from './image_series_category.component';
import { ImageRecommendTagConfComponent, ImageRecommendTagConfDetailComponent } from './image_recommend_tag.component';

// 图片模块路由器
const image_routes: Routes = [
	{ path: 'manage/image_upload', component: ImageUploadComponent },
	{ path: 'manage/image_conf', component: ImageConfComponent },
	{ path: 'manage/image_demo_conf', component: ImageDemoConfComponent },
	
	{ 
		path: 'manage/image_series_conf', 
		children: [
			{ path: '', component: ImageSeriesConfComponent },
			{ path: 'detail/:id', component: ImageSeriesConfDetailComponent },
			{ path: 'detail/add', component: ImageSeriesConfDetailComponent },
			{ path: 'set/:id', component: ImageSeriesSetComponent },
		]
	},
	
	{ 
		path: 'manage/image_series_category_conf', 
		children: [
			{ path: '', component: ImageSeriesCategoryConfComponent },
			{ path: 'detail/:id', component: ImageSeriesCategoryConfDetailComponent },
			{ path: 'detail/add', component: ImageSeriesCategoryConfDetailComponent },
			{ path: 'set/:id', component: ImageSeriesCategoryConfSetDetailComponent },
		]
	},
	
	{ 
		path: 'manage/image_tag_conf', 
		children: [
			{ path: '', component: ImageTagConfComponent },
			{ path: 'detail/:id', component: ImageTagConfDetailComponent },
			{ path: 'detail/add', component: ImageTagConfDetailComponent },
			{ path: 'set/:id', component: ImageTagSetComponent },
		]
	},
	
	{ 
		path: 'manage/image_recommend_tag_conf', 
		children: [
			{ path: '', component: ImageRecommendTagConfComponent },
			{ path: 'detail/:id', component: ImageRecommendTagConfDetailComponent },
			{ path: 'detail/add', component: ImageRecommendTagConfDetailComponent },
		]
];

@NgModule({
	imports: [ RouterModule.forChild(image_routes) ],
	exports: [ RouterModule ]
})
export class ImageRoutingModule {}