import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ModalModule } from 'angular2-modal';
import { IndexRoutingModule } from './index.routing.module';


import { IndexComponent } from './index.component';

@NgModule({
	declarations: [
		IndexComponent,
	],
	imports: [
		CommonModule,
        FileUploadModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		BrowserAnimationsModule,
		
		A2Edatetimepicker,
		ModalModule.forRoot(),
		
		IndexRoutingModule, // 根路由器放在最后
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
	],
	bootstrap: [
		IndexComponent
	]
})
export class IndexModule {
}
