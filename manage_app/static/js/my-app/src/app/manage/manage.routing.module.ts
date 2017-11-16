import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManageComponent } from './manage.component';
import { FuncConfComponent, FuncConfDetailComponent } from './func/func.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';
import { MenuFuncConfComponent, MenuFuncConfDetailComponent } from './menu_func/menu_func.component';
import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent } from './role/role.component';
import { UserRoleConfComponent, UserRoleConfDetailComponent } from './user_role/user_role.component';
import { SimpleDemoComponent } from './image/demo.component';
import { ImageUploadComponent } from './image/upload_image.component';

// 根路由器
const routes: Routes = [
	{ path: 'func_conf', component: FuncConfComponent },
	{ path: 'func_conf/detail/:id', component: FuncConfDetailComponent },
	{ path: 'func_conf/add', component: FuncConfDetailComponent },
	
	{ path: 'menu_conf', component: MenuConfComponent },
	{ path: 'menu_conf/detail/:id', component: MenuConfDetailComponent },
	{ path: 'menu_conf/add', component: MenuConfDetailComponent },
	
	{ path: 'menu_func_conf', component: MenuFuncConfComponent },
	{ path: 'menu_func_conf/detail/:id', component: MenuFuncConfDetailComponent },
	{ path: 'menu_func_conf/add', component: MenuFuncConfDetailComponent },
	
	{ path: 'role_conf', component: RoleConfComponent },
	{ path: 'role_conf/detail/:id', component: RoleConfDetailComponent },
	{ path: 'role_conf/add', component: RoleConfDetailComponent },
	{ path: 'role_conf/permission/:id', component: RolePermissionConfDetailComponent },
	
	{ path: 'user_role_conf', component: UserRoleConfComponent },
	{ path: 'user_role_conf/detail/:id', component: UserRoleConfDetailComponent },
	{ path: 'user_role_conf/add', component: UserRoleConfDetailComponent },
	
	{ path: 'image_demo', component: SimpleDemoComponent },
	{ path: 'image_upload', component: ImageUploadComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}