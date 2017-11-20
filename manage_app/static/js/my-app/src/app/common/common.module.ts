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
import { ZtreeComponent } from './ztree/ztree.component';
import { ImageQueryComponent } from './masonry/masonry.component';

// Service
import { CommonService } from './common.service';

// Directive
import { IcheckDirective } from './directive/icheck/icheck.directive';

@NgModule({
	declarations: [
		HeaderComponent,
		LeftNavComponent,
		LoadingComponent,
		ZtreeComponent,
		ImageQueryComponent,
		
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
		ZtreeComponent,
		ImageQueryComponent,
		
		IcheckDirective,
	],
	providers: [ CommonService ],
})
export class SharedModule { 
}