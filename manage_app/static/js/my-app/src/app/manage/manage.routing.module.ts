import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManageComponent } from './manage.component';

// 根路由器
const routes: Routes = [
	{ path: '', component: ManageComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			{ enableTracing: true } // <-- debugging purposes only
    )
	],
	exports: [
		RouterModule
	]
})
export class ManageRoutingModule {}