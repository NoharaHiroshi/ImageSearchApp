import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuFuncConfComponent, MenuFuncConfDetailComponent } from './menu_func.component';

const menu_func_routes: Routes = [
	{ path: 'menu_func_conf', component: MenuFuncConfComponent },
	{ path: 'menu_func_conf/detail/:id', component: MenuFuncConfDetailComponent },
	{ path: 'menu_func_conf/add', component: MenuFuncConfDetailComponent },
]

@NgModule({
	imports: [ RouterModule.forChild(menu_func_routes) ],
	exports: [ RouterModule ]
})
export class MenuFuncRoutingModule {}