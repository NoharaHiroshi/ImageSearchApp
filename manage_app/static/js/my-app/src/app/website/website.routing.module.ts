import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WebsiteComponent } from './website.component';

import { WebsiteMenuConfComponent, WebsiteMenuConfDetailComponent } from './menu/website_menu.component';

// 根路由器
const routes: Routes = [
	{ path: 'website_menu_conf', component: WebsiteMenuConfComponent },
	{ path: 'website_menu_conf/detail/:id', component: WebsiteMenuConfDetailComponent },
	{ path: 'website_menu_conf/add', component: WebsiteMenuConfDetailComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
	exports: [ RouterModule ]
})
export class WebsiteRoutingModule {}