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
import { ImageTagConfComponent, ImageTagConfDetailComponent, ImageTagSetComponent } from './image/image_tag.component';
import { ImageDemoConfComponent } from './image/image_demo.component';

// 路由器
const manage_routes: Routes = [
	{ 
		path: 'manage', 
		component: ManageComponent,
		children: [
			{ path: '',   redirectTo: 'dashboard_conf', pathMatch: 'full' },
			{ path: 'dashboard_conf', component: DashboardConfComponent },

			{ path: 'func_conf', component: FuncConfComponent },
			{ path: 'func_conf/detail/:id', component: FuncConfDetailComponent },
			{ path: 'func_conf/detail/add', component: FuncConfDetailComponent },
			
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(manage_routes) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}