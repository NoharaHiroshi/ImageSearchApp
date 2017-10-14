import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './left_nav/left_nav.component';

import { CommonService } from './common.service';

// Directive
import { IcheckDirective } from './directive/icheck/icheck.directive'

@NgModule({
	declarations: [
		HeaderComponent,
		LeftNavComponent,
		IcheckDirective,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		CommonModule
	],
	exports: [
		HeaderComponent,
		LeftNavComponent,
		IcheckDirective,
	],
	providers: [ CommonService ],
})
export class SharedModule { 
}