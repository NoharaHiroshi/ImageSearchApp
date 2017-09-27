import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule} from '@angular/common'

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UEditorModule } from 'ngx-ueditor';

import { LeftNavComponent } from './left_nav.component';

import { CommonService } from './common.service';

@NgModule({
  declarations: [
	LeftNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ToasterModule,
    CommonModule
  ],
  exports: [
	LeftNavComponent,
  ],
  providers: [ CommonService],
})
export class CommonModule { 
}
