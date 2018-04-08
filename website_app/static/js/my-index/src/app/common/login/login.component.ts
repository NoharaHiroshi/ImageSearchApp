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
	
	user: string;
	name: string;
	email: string;
	password: string;
	verify_password: string;
	captcha: string;
	login_info: string;
	register_info: string;
	
	constructor(private service: LoginService) {}
	
	closeLogin(): void {
		this.isLogin = false;
		this.returnLoginOpen.emit(this.isLogin);
	}
	
	login(): void {
		let self = this;
		this.login_info = '';
		let params = {
			'user': this.user,
			'password': this.password,
			'captcha': this.captcha
		}
		this.service.login(params).then(res => {
			if(res.response=='fail'){
				console.log('fail', '登陆失败');
				self.login_info = res.info;
			}else{
				console.log('success', '登陆成功');
				this.isLogin = false;
				this.returnLoginOpen.emit(this.isLogin);
				window.location.reload();
			}
		});
	}
	
	register(): void {
		let self = this;
		let email_reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g; 
		let phone_reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		let password_reg = /[a-zA-Z0-9_]{8,15}/;
		this.register_info = '';
		let params = {
			'name': this.name,
			'email': this.email,
			'password': this.password
		}
		if(!this.name){
			this.register_info = '请输入您的昵称';
			return;
		}
		if(!this.email || !email_reg.test(this.email)){
			this.register_info = '请输入正确的邮箱';
			return;
		}
		if(!this.password || !password_reg.test(this.password)){
			this.register_info = '请输入8-15位密码';
			return;
		}
		if(!this.verify_password || this.verify_password != this.password){
			this.register_info = '两次输入的密码不一致';
			return;
		}
		this.service.register(params).then(res => {
			if(res.response=='fail'){
				console.log('fail', '注册失败');
				self.register_info = res.info;
			}else{
				console.log('success', '注册成功');
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
		// 手机号登录
		$('.phone-login').click(function(){
			// 手机登录框显示
			$('.login-box').show();
			// 第三方登录方式隐藏
			$('.login-others').hide();
			// 注册框隐藏
			$('.login-register-box').hide();
			// 其他登录方式按钮显示
			$('.other-login').show();
			// 立即注册按钮显示
			$('.phone-register').show();
			// 返回登陆按钮隐藏
			$('.return-login').hide();
			$(this).hide();
		});
		// 其他登录方式
		$('.other-login').click(function(){
			// 手机登录框隐藏
			$('.login-box').hide();
			// 第三方登录方式显示
			$('.login-others').show();
			// 注册框隐藏
			$('.login-register-box').hide();
			// 立即注册按钮显示
			$('.phone-register').show();
			// 返回登陆按钮隐藏
			$('.return-login').hide();
			// 手机登陆按钮显示
			$('.phone-login').show();
			$(this).hide();
		});
		// 立即注册
		$('.phone-register').click(function(){
			// 手机登录框隐藏
			$('.login-box').hide();
			// 第三方登录方式隐藏
			$('.login-others').hide();
			// 注册框显示
			$('.login-register-box').show();
			// 返回登陆按钮显示
			$('.return-login').show();
			// 手机登陆按钮隐藏
			$('.phone-login').hide();
			// 其他登录方式按钮隐藏
			$('.other-login').hide();
			$(this).hide();
		});
		// 返回登录
		$('.return-login').click(function(){
			// 手机登录框显示
			$('.login-box').show();
			// 第三方登录方式隐藏
			$('.login-others').hide();
			// 注册框隐藏
			$('.login-register-box').hide();
			// 其他登录方式按钮显示
			$('.other-login').show();
			// 手机登陆按钮隐藏
			$('.phone-login').hide();
			// 立即注册按钮显示
			$('.phone-register').show();
			$(this).hide();
		});
	}
}