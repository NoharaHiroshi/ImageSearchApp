import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

// 根路由器
const routes: Routes = [
	
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
	exports: [ RouterModule ]
})
export class IndexRoutingModule {}