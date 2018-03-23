import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRoleConfComponent, UserRoleConfDetailComponent, UserRoleConfMainComponent } from './user_role.component';

const user_role_routes: Routes = [
	{ 
		path: 'manage',
		children: [
			{
				path: 'user_role_conf', 
				component: UserRoleConfMainComponent, 
				children: [
					{ path: '', component: UserRoleConfComponent },
					{ 
						path: 'detail', 
						children: [
							{ path: ':id', component: UserRoleConfDetailComponent },
							{ path: 'add', component: UserRoleConfDetailComponent },
						] 
					}
				] 
			}
		]
	}
]

@NgModule({
	imports: [ RouterModule.forChild(user_role_routes) ],
	exports: [ RouterModule ]
})
export class UserRoleRoutingModule {}