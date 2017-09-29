import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './left_nav/left_nav.component';

import { CommonService } from './common.service';

@NgModule({
	declarations: [
		HeaderComponent,
		LeftNavComponent,
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
	],
	providers: [ CommonService ],
})
export class SharedModule { 
}