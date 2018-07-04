declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { ListBaseComponent } from '../../../common/base.component';

import { UserChangePasswordService } from './change_password.service';

import { AppConfig } from '../../../../config/app_config';

@Component({
  selector: 'user-change-password-root',
  templateUrl: './change_password.html',
})
export class UserChangePasswordComponent extends ListBaseComponent{
	old_password: string;
	new_password: string;
	verify_password: string;
	info: string;
	
	constructor(private config: AppConfig, public service: UserChangePasswordService) {
		super();
	}
	
	getPagerData(): any {
		let self = this;
		this.config.isLoading = true
		this.service.getDetail().then(res => {
			if(this.config.authCheck(res)){
				this.config.isLoading = false;
			}
		});
	}
	
	changePassword(): void {
		let self = this;
		if(!this.old_password){
			this.config.tipOut('请输入当前密码', 'fail');
			return;
		}
		if(!this.new_password){
			this.config.tipOut('请输入新密码', 'fail');
			return;
		}
		if(!this.verify_password){
			this.config.tipOut('请再次输入新密码', 'fail');
			return;
		}
		if(this.verify_password != this.new_password){
			this.config.tipOut('两次输入的密码不一致，请检查', 'fail');
			return;
		}
		let params = {
			'old_password': this.old_password,
			'new_password': this.new_password,
			'verify_password': this.verify_password
		}
		this.service.changePassword(params).then(res => {
			if(this.config.authCheck(res)){
				this.config.tipCheck(res);
			}
		})
	}
}