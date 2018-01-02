import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WebsiteComponent } from './website.component';

import { WebsiteMenuConfComponent, WebsiteMenuConfDetailComponent } from './menu/website_menu.component';
import { HotSearchConfComponent, HotSearchConfDetailComponent } from './hot_search/hot_search.component';
import { BannerConfComponent, BannerConfDetailComponent } from './banner/banner.component';

// 根路由器
const routes: Routes = [
	{ path: 'website_menu_conf', component: WebsiteMenuConfComponent },
	{ path: 'website_menu_conf/detail/:id', component: WebsiteMenuConfDetailComponent },
	{ path: 'website_menu_conf/add', component: WebsiteMenuConfDetailComponent },
	
	{ path: 'hot_search_conf', component: HotSearchConfComponent },
	{ path: 'hot_search_conf/detail/:id', component: HotSearchConfDetailComponent},
	{ path: 'hot_search_conf/add', component: HotSearchConfDetailComponent},
	
	{ path: 'banner_conf', component: BannerConfComponent },
	{ path: 'banner_conf/detail/:id', component: BannerConfDetailComponent},
	{ path: 'banner_conf/add', component: BannerConfDetailComponent},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class WebsiteRoutingModule {}