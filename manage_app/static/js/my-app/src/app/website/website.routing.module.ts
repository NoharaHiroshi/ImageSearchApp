import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WebsiteComponent } from './website.component';

import { WebsiteMenuConfComponent, WebsiteMenuConfDetailComponent } from './menu/website_menu.component';
import { HotSearchConfComponent, HotSearchConfDetailComponent } from './hot_search/hot_search.component';

// 根路由器
const routes: Routes = [
	{ path: 'website_menu_conf', component: WebsiteMenuConfComponent },
	{ path: 'website_menu_conf/detail/:id', component: WebsiteMenuConfDetailComponent },
	{ path: 'website_menu_conf/add', component: WebsiteMenuConfDetailComponent },
	
	{ path: 'hot_search_conf', component: HotSearchConfComponent },
	{ path: 'hot_search_conf/detail/:id', component: HotSearchConfDetailComponent},
	{ path: 'hot_search_conf/add', component: HotSearchConfDetailComponent},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class WebsiteRoutingModule {}