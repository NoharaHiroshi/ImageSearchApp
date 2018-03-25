import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent, RoleConfMainComponent } from './role.component';

const role_routes: Routes = [
	{ 
		path: 'manage/role_conf', 
		component: RoleConfMainComponent, 
		children: [
			{ path: '', component: RoleConfComponent },
			{ path: 'detail/:id', component: RoleConfDetailComponent },
			{ path: 'detail/add', component: RoleConfDetailComponent },
			{ path: 'permission/:id', component: RolePermissionConfDetailComponent }
		] 
	}
]

@NgModule({
	imports: [ RouterModule.forChild(role_routes) ],
	exports: [ RouterModule ]
})
export class RoleRoutingModule {}