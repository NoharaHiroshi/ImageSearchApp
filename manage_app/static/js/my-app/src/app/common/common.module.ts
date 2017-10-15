import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

// Component
import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './left_nav/left_nav.component';
import { LoadingComponent } from './loading/loading.component';

// Service
import { CommonService } from './common.service';

// Directive
import { IcheckDirective } from './directive/icheck/icheck.directive'

@NgModule({
	declarations: [
		HeaderComponent,
		LeftNavComponent,
		LoadingComponent,
		
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
		LoadingComponent,
		
		IcheckDirective,
	],
	providers: [ CommonService ],
})
export class SharedModule { 
}