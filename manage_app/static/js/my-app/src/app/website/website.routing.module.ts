import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WebsiteComponent } from './website.component';

import { BannerModule } from './banner/banner.module';

import { WebsiteMenuConfComponent, WebsiteMenuConfDetailComponent } from './menu/website_menu.component';
import { HotSearchConfComponent, HotSearchConfDetailComponent } from './hot_search/hot_search.component';
import { ColumnConfComponent, ColumnConfDetailComponent, ColumnConfSetDetailComponent } from './column/column.component';

// 根路由器
const website_routes: Routes = [
	{ 
		path: 'website', 
		children: [
			{ path: '', redirectTo: 'website_menu_conf', pathMatch: 'full'},
			{ path: 'website_menu_conf', component: WebsiteMenuConfComponent },
			{ path: 'website_menu_conf/detail/:id', component: WebsiteMenuConfDetailComponent },
			{ path: 'website_menu_conf/detail/add', component: WebsiteMenuConfDetailComponent },
			
			{ path: 'hot_search_conf', component: HotSearchConfComponent },
			{ path: 'hot_search_conf/detail/:id', component: HotSearchConfDetailComponent},
			{ path: 'hot_search_conf/detail/add', component: HotSearchConfDetailComponent},

			{ path: 'column_conf', component: ColumnConfComponent },
			{ path: 'column_conf/detail/:id', component: ColumnConfDetailComponent},
			{ path: 'column_conf/detail/add', component: ColumnConfDetailComponent},
			{ path: 'column_conf/detail/set/:id', component: ColumnConfSetDetailComponent},
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(website_routes) ],
	exports: [ RouterModule ]
})
export class WebsiteRoutingModule {}