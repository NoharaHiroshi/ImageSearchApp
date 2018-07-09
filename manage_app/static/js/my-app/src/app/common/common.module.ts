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
import { ImageQueryComponent } from './image_list/image_list.component';
import { MasonryComponent } from './masonry/masonry.component';
import { PageComponent } from './paging/paging.component';

// Service
import { CommonService } from './common.service';

// Directive
import { IcheckDirective } from './directive/icheck/icheck.directive';

// ng-2 Module
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
	declarations: [
		HeaderComponent,
		LeftNavComponent,
		LoadingComponent,
		ZtreeComponent,
		ImageQueryComponent,
		MasonryComponent,
		PageComponent,
		
		IcheckDirective,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		CommonModule,
		CKEditorModule
	],
	exports: [
		HeaderComponent,
		LeftNavComponent,
		LoadingComponent,
		ZtreeComponent,
		ImageQueryComponent,
		MasonryComponent,
		PageComponent,
		
		CKEditorModule,
		
		IcheckDirective,
	],
	providers: [ CommonService ],
})
export class SharedModule { 
}