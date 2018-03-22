import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { BannerConfComponent, BannerConfDetailComponent, BannerConfMainComponent } from './banner.component';

const banner_routes: Routes = [
	{ 
		path: 'banner_conf', 
		component: BannerConfMainComponent, 
		children: [
			{ 
				path: '', 
				component: BannerConfComponent 
			},
			{ 
				path: 'detail', 
				children: [
					{ path: ':id', component: BannerConfDetailComponent },
					{ path: 'add', component: BannerConfDetailComponent }
				]
			}
		]
	}
]

@NgModule({
	imports: [ RouterModule.forChild(banner_routes) ],
	exports: [ RouterModule ]
})
export class BannerRoutingModule {}