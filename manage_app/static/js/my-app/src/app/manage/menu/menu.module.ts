import { NgModule } from  '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../../common/common.module';

import { MenuRoutingModule } from './menu.routing.module';
import { MenuService } from './menu.service';
import { MenuConfComponent, MenuConfDetailComponent, MenuConfMainComponent } from './menu.component';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, MenuRoutingModule ],
	declarations: [ MenuConfComponent, MenuConfDetailComponent, MenuConfMainComponent ],
	providers: [ MenuService ]
})
export class MenuModule {}