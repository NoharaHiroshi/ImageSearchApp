import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';

import { LoginService } from './login.service';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { ListBaseComponent } from '../base.component';

import { Banner } from '../../model/banner';
import { WebsiteMenu } from '../../model/website_menu';
import { HotSearch } from '../../model/hot_search';
import { Customer } from '../../model/customer';

import { AppConfig } from '../../../config/app_config';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class LoginComponent{
	@Input() isLogin: any;
	@Output() returnLoginOpen = new EventEmitter<any>();  
	
	phone: string;
	password: string;
	captcha: string;
	
	constructor(private service: LoginService) {}
	
	closeLogin(): void {
		this.isLogin = false;
		this.returnLoginOpen.emit(this.isLogin);
	}
	
	login(): void {
		let self = this;
		let params = {
			'phone': this.phone,
			'password': this.password,
			'captcha': this.captcha
		}
		this.service.login(params).then(res => {
			if(res.response=='fail'){
				console.log('fail', '登陆失败');
			}else{
				console.log('success', '登陆成功');
				this.isLogin = false;
				this.returnLoginOpen.emit(this.isLogin);
				window.location.reload();
			}
		});
	}
	
	ngAfterViewChecked(): void {
		let self = this;
		if(this.isLogin){
			$('.login-modal').show();
		}else{
			$('.login-modal').hide();
		}
		$('.phone-login').click(function(){
			$('.login-box').show();
			$('.account-box').show();
			$('.other-login').show();
			$('.login-others').hide();
			$(this).hide();
		})
		$('.other-login').click(function(){
			$('.login-others').show();
			$('.phone-login').show();
			$('.login-box').hide();
			$('.account-box').hide();
			$(this).hide();
		})
	}
}