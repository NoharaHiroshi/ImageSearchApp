import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

import { HeaderComponent } from './header.component';
import { LeftNavComponent } from './left_nav.component';
import { PagerComponent } from './pager.component';

import { CommonService } from './common.service';

@NgModule({
	declarations: [
		HeaderComponent,
		LeftNavComponent,
		PagerComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
	],
	exports: [
		HeaderComponent,
		LeftNavComponent,
		PagerComponent,
	],
	providers: [ CommonService ],
})
export class CommonModule { 
}