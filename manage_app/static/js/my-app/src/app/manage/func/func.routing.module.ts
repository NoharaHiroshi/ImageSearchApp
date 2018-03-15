import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncConfComponent, FuncConfDetailComponent } from './func.component';

const func_routes: Routes = [
	{ path: 'func_conf', component: FuncConfComponent },
	{ path: 'func_conf/detail/:id', component: FuncConfDetailComponent },
	{ path: 'func_conf/detail/add', component: FuncConfDetailComponent }
]

@NgModule({
	imports: [ RouterModule.forChild(func_routes) ],
	exports: [ RouterModule ]
})
export class FuncRoutingModule {}