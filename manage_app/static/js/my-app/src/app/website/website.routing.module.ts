import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WebsiteComponent } from './website.component';

import { BannerConfComponent, BannerConfDetailComponent } from './banner/banner.component';
import { WebsiteMenuConfComponent, WebsiteMenuConfDetailComponent } from './menu/website_menu.component';
import { HotSearchConfComponent, HotSearchConfDetailComponent } from './hot_search/hot_search.component';
import { ColumnConfComponent, ColumnConfDetailComponent, ColumnConfSetDetailComponent } from './column/column.component';
import { CustomerConfComponent, CustomerConfDetailComponent, CustomerDiscountConfDetailComponent } from './customer/customer.component';
import { DiscountConfComponent, DiscountConfDetailComponent } from './discount/discount.component';

import { AuthGuard } from '../common/auth/auth.service';

// 根路由器
const website_routes: Routes = [
	{ 
		path: 'website', 
		component: WebsiteComponent,
		canActivateChild: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'website_menu_conf', pathMatch: 'full'},
			{ path: 'website_menu_conf', component: WebsiteMenuConfComponent },
			{ path: 'website_menu_conf/detail/:id', component: WebsiteMenuConfDetailComponent },
			{ path: 'website_menu_conf/detail/add', component: WebsiteMenuConfDetailComponent },
			
			{ path: 'banner_conf', component: BannerConfComponent },
			{ path: 'banner_conf/detail/:id', component: BannerConfDetailComponent },
			{ path: 'banner_conf/detail/add', component: BannerConfDetailComponent },
			
			{ path: 'hot_search_conf', component: HotSearchConfComponent },
			{ path: 'hot_search_conf/detail/:id', component: HotSearchConfDetailComponent},
			{ path: 'hot_search_conf/detail/add', component: HotSearchConfDetailComponent},

			{ path: 'column_conf', component: ColumnConfComponent },
			{ path: 'column_conf/detail/:id', component: ColumnConfDetailComponent},
			{ path: 'column_conf/detail/add', component: ColumnConfDetailComponent},
			{ path: 'column_conf/detail/set/:id', component: ColumnConfSetDetailComponent},
			
			{ path: 'customer_conf', component: CustomerConfComponent },
			{ path: 'customer_conf/detail/:id', component: CustomerConfDetailComponent},
			{ path: 'customer_conf/detail/add', component: CustomerConfDetailComponent},
			{ path: 'customer_conf/detail/get_customer_discount/:id', component: CustomerDiscountConfDetailComponent },
			
			{ path: 'discount_conf', component: DiscountConfComponent },
			{ path: 'discount_conf/detail/:id', component: DiscountConfDetailComponent},
			{ path: 'discount_conf/detail/add', component: DiscountConfDetailComponent},
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(website_routes) ],
	exports: [ RouterModule ]
})
export class WebsiteRoutingModule {}