import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../common/common.module';

import { FuncRoutingModule } from './func.routing.module';
import { FuncConfComponent, FuncConfDetailComponent, FuncConfMainComponent } from './func.component';
import { FuncService } from './func.service';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, FuncRoutingModule ],
	declarations: [ FuncConfComponent, FuncConfDetailComponent, FuncConfMainComponent ],
	providers: [ FuncService ]
})
export class FuncModule {}