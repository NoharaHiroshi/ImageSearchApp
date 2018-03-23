import { NgModule } from  '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../../common/common.module';

import { RoleRoutingModule } from './role.routing.module';
import { RoleService } from './role.service';
import { RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent, RoleConfMainComponent } from './role.component';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, RoleRoutingModule ],
	declarations: [ RoleConfComponent, RoleConfDetailComponent, RolePermissionConfDetailComponent, RoleConfMainComponent ],
	providers: [ RoleService ]
})
export class RoleModule {}