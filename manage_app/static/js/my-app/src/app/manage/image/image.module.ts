import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { A2Edatetimepicker } from '../../common/directive/datetimepicker/datetimepicker.module';

import { ModalModule } from 'angular2-modal';
import { SharedModule } from '../../common/common.module';

import { ImageRoutingModule } from './image.routing.module';

import { ImageUploadComponent } from './upload_image.component';
import { ImageConfComponent } from './image.component';
import { ImageSeriesConfComponent, ImageSeriesConfDetailComponent, ImageSeriesSetComponent } from './image_series.component';
import { ImageTagConfComponent, ImageTagConfDetailComponent, ImageTagSetComponent } from './image_tag.component';
import { ImageDemoConfComponent } from './image_demo.component';
import { ImageSeriesCategoryConfComponent, ImageSeriesCategoryConfDetailComponent, ImageSeriesCategoryConfSetDetailComponent} from './image_series_category.component';
import { ImageRecommendTagConfComponent, ImageRecommendTagConfDetailComponent } from './image_recommend_tag.component';

import { ImageService } from './image.service';
import { ImageSeriesService } from './image_series.service';
import { ImageTagService } from './image_tag.service';
import { ImageSeriesCategoryService } from './image_series_category.service';
import { ImageRecommendTagService } from './image_recommend_tag.service';

@NgModule({
	declarations: [
		ImageUploadComponent,
		ImageConfComponent,
		
		ImageSeriesConfComponent,
		ImageSeriesConfDetailComponent,
		ImageSeriesSetComponent,
		
		ImageTagConfComponent,
		ImageTagConfDetailComponent,
		ImageTagSetComponent,
		ImageDemoConfComponent,
		
		ImageSeriesCategoryConfComponent,
		ImageSeriesCategoryConfDetailComponent,
		ImageSeriesCategoryConfSetDetailComponent,
		
		ImageRecommendTagConfComponent,
		ImageRecommendTagConfDetailComponent
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
		
		ImageRoutingModule, // 图片路由器放在最后
	],
	providers: [
		ImageService,
		ImageSeriesService,
		ImageTagService,
		ImageSeriesCategoryService,
		ImageRecommendTagService
	]
})
export class ImageModule {
}
