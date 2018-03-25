import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

// 根路由器
const routes: Routes = [
	{ path: '',  redirectTo: 'manage', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}