import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncConfMainComponent, FuncConfComponent, FuncConfDetailComponent } from './func.component';

const func_routes: Routes = [
	{ 
		path: 'func_conf', 
		component: FuncConfMainComponent, 
		children: [
			{ path: '', component: FuncConfComponent },
			{ path: 'detail/:id', component: FuncConfDetailComponent },
			{ path: 'detail/add', component: FuncConfDetailComponent },
		] 
	}
]

@NgModule({
	imports: [ RouterModule.forChild(func_routes) ],
	exports: [ RouterModule ]
})
export class FuncRoutingModule {}