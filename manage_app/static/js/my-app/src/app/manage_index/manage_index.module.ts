import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';


import { ManageIndexComponent } from './manage_index.component';
import { ManageIndexRoutingModule }     from './manage_index_routing.module';


@NgModule({
  declarations: [
    ManageIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    ManageIndexRoutingModule
  ],
  providers: [],
  bootstrap: [ManageIndexComponent]
})
export class ManageIndexModule { 

}


