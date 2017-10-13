import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManageComponent } from './manage.component';
import { FuncConfComponent, FuncConfDetailComponent } from './func/func.component';
import { MenuConfComponent, MenuConfDetailComponent } from './menu/menu.component';

// 根路由器
const routes: Routes = [
	{ path: 'func_conf', component: FuncConfComponent },
	{ path: 'func_conf/detail/:id', component: FuncConfDetailComponent },
	{ path: 'func_conf/add', component: FuncConfDetailComponent },
	
	{ path: 'menu_conf', component: MenuConfComponent },
	{ path: 'menu_conf/detail/:id', component: MenuConfDetailComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
	exports: [ RouterModule ]
})
export class ManageRoutingModule {}