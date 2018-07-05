import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManageComponent } from './manage.component';

import { DashboardConfComponent } from './dashboard/dashboard.component';
import { FuncConfComponent, FuncConfDetailComponent } from './func/func.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';
import { MenuFuncConfComponent, MenuFuncConfDetailComponent } from './menu_func/menu_func.component';
import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent } from './role/role.component';
import { UserRoleConfComponent, UserRoleConfDetailComponent } from './user_role/user_role.component';
import { ImageUploadComponent } from './image/upload_image.component';
import { ImageConfComponent } from './image/image.component';
import { ImageSeriesConfComponent, ImageSeriesConfDetailComponent, ImageSeriesSetComponent } from './image/image_series.component';
import { ImageSeriesCategoryConfComponent, ImageSeriesCategoryConfDetailComponent, ImageSeriesCategoryConfSetDetailComponent } from './image/image_series_category.component';
import { ImageTagConfComponent, ImageTagConfDetailComponent, ImageTagSetComponent, ImageAssociationTagSetComponent } from './image/image_tag.component';
import { ImageDemoConfComponent } from './image/image_demo.component';
import { ImageRecommendTagConfComponent, ImageRecommendTagConfDetailComponent } from './image/image_recommend_tag.component';

import { AuthGuard } from '../common/auth/auth.service';

// 路由器
const manage_routes: Routes = [
	{ 
		path: 'manage', 
		component: ManageComponent,
		canActivateChild: [AuthGuard],
		children: [
			{ path: '',   redirectTo: 'dashboard_conf', pathMatch: 'full' },
			{ path: 'dashboard_conf', component: DashboardConfComponent },

			{ path: 'func_conf', component: FuncConfComponent },
			{ path: 'func_conf/detail/:id', component: FuncConfDetailComponent },
			{ path: 'func_conf/detail/add', component: FuncConfDetailComponent },
			
			{ path: 'menu_conf', component: MenuConfComponent },
			{ path: 'menu_conf/detail/:id', component: MenuConfDetailComponent },
			{ path: 'menu_conf/detail/add', component: MenuConfDetailComponent },
			
			{ path: 'menu_func_conf', component: MenuFuncConfComponent },
			{ path: 'menu_func_conf/detail/:id', component: MenuFuncConfDetailComponent },
			{ path: 'menu_func_conf/detail/add', component: MenuFuncConfDetailComponent },
			
			{ path: 'role_conf', component: RoleConfComponent },
			{ path: 'role_conf/detail/:id', component: RoleConfDetailComponent },
			{ path: 'role_conf/detail/add', component: RoleConfDetailComponent },
			{ path: 'role_conf/permission/:id', component: RolePermissionConfDetailComponent },
			
			{ path: 'user_role_conf', component: UserRoleConfComponent },
			{ path: 'user_role_conf/detail/:id', component: UserRoleConfDetailComponent },
			{ path: 'user_role_conf/detail/add', component: UserRoleConfDetailComponent },
			
			{ path: 'image_upload', component: ImageUploadComponent },
			{ path: 'image_conf', component: ImageConfComponent },
			
			{ path: 'image_series_conf', component: ImageSeriesConfComponent },
			{ path: 'image_series_conf/detail/:id', component: ImageSeriesConfDetailComponent },
			{ path: 'image_series_conf/detail/add', component: ImageSeriesConfDetailComponent },
			{ path: 'image_series_conf/set/:id', component: ImageSeriesSetComponent },
			
			{ path: 'image_tag_conf', component: ImageTagConfComponent },
			{ path: 'image_tag_conf/detail/:id', component: ImageTagConfDetailComponent },
			{ path: 'image_tag_conf/detail/add', component: ImageTagConfDetailComponent },
			{ path: 'image_tag_conf/set/:id', component: ImageTagSetComponent },
			{ path: 'image_tag_conf/association/:id', component: ImageAssociationTagSetComponent },
			{ path: 'image_demo_conf', component: ImageDemoConfComponent },
			
			{ path: 'image_recommend_tag_conf', component: ImageRecommendTagConfComponent },
			{ path: 'image_recommend_tag_conf/detail/:id', component: ImageRecommendTagConfDetailComponent },
			{ path: 'image_recommend_tag_conf/detail/add', component: ImageRecommendTagConfDetailComponent },
			
			{ path: 'image_recommend_tag_conf', component: ImageRecommendTagConfComponent },
			{ path: 'image_recommend_tag_conf/detail/:id', component: ImageRecommendTagConfDetailComponent },
			{ path: 'image_recommend_tag_conf/detail/add', component: ImageRecommendTagConfDetailComponent },
			
			{ path: 'image_series_category_conf', component: ImageSeriesCategoryConfComponent },
			{ path: 'image_series_category_conf/detail/:id', component: ImageSeriesCategoryConfDetailComponent },
			{ path: 'image_series_category_conf/detail/add', component: ImageSeriesCategoryConfDetailComponent },
			{ path: 'image_series_category_conf/set/:id', component: ImageSeriesCategoryConfSetDetailComponent },
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(manage_routes) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}