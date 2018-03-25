import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuConfComponent, MenuConfDetailComponent, MenuConfMainComponent } from './menu.component';

const menu_routes: Routes = [
	{ 
		path: 'manage/menu_conf', 
		component: MenuConfMainComponent, 
		children: [
			{ path: '', component: MenuConfComponent },
			{ path: 'detail/:id', component: MenuConfDetailComponent },
			{ path: 'detail/add', component: MenuConfDetailComponent }
		] 
	}
]

@NgModule({
	imports: [ RouterModule.forChild(menu_routes) ],
	exports: [ RouterModule ]
})
export class MenuRoutingModule {}