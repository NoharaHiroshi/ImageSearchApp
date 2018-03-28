import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LoginComponent } from './common/login/login.component';

// 根路由器
const routes: Routes = [
	{ path: '',  redirectTo: 'manage', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}