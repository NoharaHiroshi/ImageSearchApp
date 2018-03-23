import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncConfMainComponent, FuncConfComponent, FuncConfDetailComponent } from './func.component';

import { AuthGuard } from '../../common/auth/auth.service';

const func_routes: Routes = [
	{ 
		path: 'manage',
		children: [
			{
				path: 'func_conf', 
				component: FuncConfMainComponent, 
				canActivate: [AuthGuard],
				children: [
					{ path: '', component: FuncConfComponent },
					{ 
						path: 'detail', 
						children: [
							{ path: ':id', component: FuncConfDetailComponent },
							{ path: 'add', component: FuncConfDetailComponent },
						] 
					}
				] 
			}
		]
	}
]

@NgModule({
	imports: [ RouterModule.forChild(func_routes) ],
	exports: [ RouterModule ]
})
export class FuncRoutingModule {}