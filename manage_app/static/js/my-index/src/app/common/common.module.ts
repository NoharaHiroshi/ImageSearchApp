import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

// Component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Service
import { CommonService } from './common.service';


@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent
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
		FooterComponent
	],
	providers: [ CommonService ],
})
export class SharedModule { 
}