import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManageComponent } from './manage.component';
import { PermissionConfComponent, PermissionConfDetailComponent } from './permission/permission.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';

// 根路由器
const routes: Routes = [
	{ path: 'permission_conf', component: PermissionConfComponent },
	{ path: 'permission_conf/detail:id', component: PermissionConfDetailComponent },
	
	{ path: 'menu_conf', component: MenuConfComponent },
	{ path: 'menu_conf/detail:id', component: MenuConfDetailComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, {useHash: true})],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}