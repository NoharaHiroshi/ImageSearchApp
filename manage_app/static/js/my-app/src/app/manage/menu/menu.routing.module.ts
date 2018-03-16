import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuConfComponent, MenuConfDetailComponent } from './menu.component';

const menu_routes: Routes = [
	{ path: 'menu_conf', component: MenuConfComponent },
	{ path: 'menu_conf/detail/:id', component: MenuConfDetailComponent },
	{ path: 'menu_conf/add', component: MenuConfDetailComponent },
]

@NgModule({
	imports: [ RouterModule.forChild(menu_routes) ],
	exports: [ RouterModule ]
})
export class MenuRoutingModule {}