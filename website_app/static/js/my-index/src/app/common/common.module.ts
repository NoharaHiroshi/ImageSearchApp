import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

// Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageComponent } from './paging/paging.component';

// Service
import { CommonService } from './common.service';

import { AppConfig } from '../../config/app_config';


@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		PageComponent
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
		FooterComponent,
		PageComponent
	],
	providers: [ CommonService, AppConfig ],
})
export class SharedModule { 
}