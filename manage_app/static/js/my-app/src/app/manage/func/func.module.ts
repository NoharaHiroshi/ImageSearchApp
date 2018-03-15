import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../common/common.module';

import { FuncRoutingModule } from './func.routing.module';
import { FuncConfComponent, FuncConfDetailComponent } from './func.component';
import { FuncService } from './func.service';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, FuncRoutingModule ],
	declarations: [ FuncConfComponent, FuncConfDetailComponent ],
	providers: [ FuncService ]
})
export class FuncModule {}