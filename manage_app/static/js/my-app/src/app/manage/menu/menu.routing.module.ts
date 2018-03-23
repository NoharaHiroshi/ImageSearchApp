import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuConfComponent, MenuConfDetailComponent, MenuConfMainComponent } from './menu.component';

const menu_routes: Routes = [
	{ 
		path: 'manage',
		children: [
			{
				path: 'menu_conf', 
				component: MenuConfMainComponent, 
				children: [
					{ path: '', component: MenuConfComponent },
					{ 
						path: 'detail', 
						children: [
							{ path: ':id', component: MenuConfDetailComponent },
							{ path: 'add', component: MenuConfDetailComponent },
						] 
					}
				] 
			}
		]
	}
]

@NgModule({
	imports: [ RouterModule.forChild(menu_routes) ],
	exports: [ RouterModule ]
})
export class MenuRoutingModule {}