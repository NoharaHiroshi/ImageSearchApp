import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { MainPageComponent } from './index/main_page.component';
import { ImageSeriesListComponent } from './image_series_list/image_series_list.component';
import { ImageListComponent } from './image_list/image_list.component';

// 根路由器
const routes: Routes = [
	{ path: '',  component: MainPageComponent },
	{ path: 'image_series_list/:id', component: ImageSeriesListComponent },
	{ path: 'image_list/:id', component: ImageListComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class IndexRoutingModule {}