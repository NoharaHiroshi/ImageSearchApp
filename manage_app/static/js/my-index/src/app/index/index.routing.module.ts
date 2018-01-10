import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { MainPageComponent } from './index/main_page.component';
import { ImageSeriesListComponent } from './image_series_list/image_series_list.component';

// 根路由器
const routes: Routes = [
	{ path: '',  component: MainPageComponent },
	{ path: 'image_series_list/:id', component: ImageSeriesListComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class IndexRoutingModule {}