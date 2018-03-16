import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent } from './role.component';

const role_routes: Routes = [
	{ path: 'role_conf', component: RoleConfComponent },
	{ path: 'role_conf/detail/:id', component: RoleConfDetailComponent },
	{ path: 'role_conf/add', component: RoleConfDetailComponent },
	{ path: 'role_conf/permission/:id', component: RolePermissionConfDetailComponent },
]

@NgModule({
	imports: [ RouterModule.forChild(role_routes) ],
	exports: [ RouterModule ]
})
export class RoleRoutingModule {}