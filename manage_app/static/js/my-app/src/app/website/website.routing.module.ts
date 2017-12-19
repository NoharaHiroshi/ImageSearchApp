import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WebsiteComponent } from './manage.component';

// 根路由器
const routes: Routes = [
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
	exports: [ RouterModule ]
})
export class WebsiteRoutingModule {}