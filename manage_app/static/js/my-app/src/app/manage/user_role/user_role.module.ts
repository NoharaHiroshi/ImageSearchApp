import { NgModule } from  '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { SharedModule } from '../../common/common.module';

import { UserRoleRoutingModule } from './user_role.routing.module';
import { UserRoleService } from './user_role.service';
import { UserRoleConfComponent, UserRoleConfDetailComponent } from './user_role.component';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, UserRoleRoutingModule ],
	declarations: [ UserRoleConfComponent, UserRoleConfDetailComponent ],
	providers: [ UserRoleService ]
})
export class UserRoleModule {}