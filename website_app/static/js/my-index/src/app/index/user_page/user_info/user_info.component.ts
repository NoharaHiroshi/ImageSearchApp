declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { ListBaseComponent } from '../../../common/base.component';

import { AppConfig } from '../../../../config/app_config';
import { UserInfoService } from './user_info.service';

@Component({
  selector: 'user-info-root',
  templateUrl: './user_info.html',
})
export class UserInfoComponent extends ListBaseComponent implements OnInit{
	
	constructor(private config: AppConfig, private service: UserInfoService) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		console.log('config.user');
		console.log(this.config.user);
		if(this.config.user){
			this.service.getDetail(this.config.user.id)
				.subscribe(res => {
					this.customer = res['customer'];
					this.isLoading = false;
				});
		}else{
			this.config.isLoginOpen = true;
		}
	}
}