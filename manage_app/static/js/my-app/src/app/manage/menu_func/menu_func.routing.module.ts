import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuFuncConfComponent, MenuFuncConfDetailComponent, MenuFuncConfMainComponent } from './menu_func.component';

const menu_func_routes: Routes = [
	{ 
		path: 'manage',
		children: [
			{
				path: 'menu_func_conf', 
				component: MenuFuncConfMainComponent, 
				children: [
					{ path: '', component: MenuFuncConfComponent },
					{ 
						path: 'detail', 
						children: [
							{ path: ':id', component: MenuFuncConfDetailComponent },
							{ path: 'add', component: MenuFuncConfDetailComponent },
						] 
					}
				] 
			}
		]
	}
]

@NgModule({
	imports: [ RouterModule.forChild(menu_func_routes) ],
	exports: [ RouterModule ]
})
export class MenuFuncRoutingModule {}