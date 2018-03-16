import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRoleConfComponent, UserRoleConfDetailComponent } from './user_role.component';

const user_role_routes: Routes = [
	{ path: 'user_role_conf', component: UserRoleConfComponent },
	{ path: 'user_role_conf/detail/:id', component: UserRoleConfDetailComponent },
	{ path: 'user_role_conf/add', component: UserRoleConfDetailComponent },
]

@NgModule({
	imports: [ RouterModule.forChild(user_role_routes) ],
	exports: [ RouterModule ]
})
export class UserRoleRoutingModule {}