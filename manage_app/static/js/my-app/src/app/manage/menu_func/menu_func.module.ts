import { NgModule } from  '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../../common/common.module';

import { MenuFuncRoutingModule } from './menu_func.routing.module';
import { MenuFuncService } from './menu_func.service';
import { MenuFuncConfComponent, MenuFuncConfDetailComponent, MenuFuncConfMainComponent } from './menu_func.component';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, MenuFuncRoutingModule ],
	declarations: [ MenuFuncConfComponent, MenuFuncConfDetailComponent, MenuFuncConfMainComponent ],
	providers: [ MenuFuncService ]
})
export class MenuFuncModule {}