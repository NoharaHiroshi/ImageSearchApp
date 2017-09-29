import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ManageRoutingModule } from './manage.routing.module';

import { SharedModule } from '../common/common.module';

import { ManageComponent } from './manage.component';


@NgModule({
	declarations: [
		ManageComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		FormsModule,
		HttpModule,
		RouterModule,
		BrowserAnimationsModule,
		
		SharedModule,
		
		ManageRoutingModule, // 根路由器放在最后
	],
	providers: [
    
	],
	bootstrap: [
		ManageComponent
	]
})
export class ManageModule {
}
