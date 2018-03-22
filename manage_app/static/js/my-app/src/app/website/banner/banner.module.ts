import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../common/common.module';

import { BannerRoutingModule } from './banner.routing.module';
import { BannerConfComponent, BannerConfDetailComponent, BannerConfMainComponent } from './banner.component';
import { BannerService } from './banner.service';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, BannerRoutingModule ],
	declarations: [ BannerConfComponent, BannerConfDetailComponent, BannerConfMainComponent ],
	providers: [ BannerService ]
})
export class BannerModule {}