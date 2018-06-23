declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { ListBaseComponent } from '../../../common/base.component';

import { Customer } from '../../../model/customer';

import { AppConfig } from '../../../../config/app_config';
import { UserInfoService } from './user_info.service';

@Component({
  selector: 'user-info-root',
  templateUrl: './user_info.html',
})
export class UserInfoComponent extends ListBaseComponent implements OnInit{
	customer: Customer;
	// 0：只读、 1：编辑
	mode: number = 0;
	
	constructor(public config: AppConfig, public service: UserInfoService) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		if(this.config.user){
			this.service.getDetail(this.config.user.id).then(res => {
				this.customer = res['customer'];
				this.isLoading = false;
			});
		}else{
			this.config.isLoginOpen = true;
		}
	}
	
	editUserInfo(): void {
		this.mode = 1;
	}
	
	updateUserInfo(): void {
		this.mode = 0;
		this.service.update(this.customer).then(res => {
			if(res.response == 'ok'){
				console.log('修改成功');
			}else{
				console.log('修改失败');
			}
		})
	}
	
	cancelUserInfo(): void {
		this.mode = 0;
	}
}