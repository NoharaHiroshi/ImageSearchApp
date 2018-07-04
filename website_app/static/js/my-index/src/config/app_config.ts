import { Injectable } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';
import { User } from '../app/model/user';


@Injectable()
export class AppConfig {
	name = '测试项目-前端';
    version = '1.0.0';
	// 静态资源服务器
	resource_url = 'http://127.0.0.1:8888';
	
	// 当前用户
	user: User;
	
	// 加载动画
	isLoading = false;
	
	// 登陆页面开关
    isLoginOpen = false;
	
	// 跳转前url
	tmp_url: string;
	
	// 登陆权限验证
	authCheck(json: any){
		let response = json['response'];
		let url = json['url'];
		let redirect_url = window.location.href;
		if(response == 'NeedLogin'){
			// 验证需要登录时，打开登陆页面
			window.location.href = url + '?redirect_url=' + redirect_url;
		}else if(response == 'NeedAuth'){
			// 验证需要认证邮箱时，打开页面
			window.location.href = url;
		}else{
			return true;
		}
	}
	
	// 提示信息验证
	tipCheck(json: any){
		let response = json['response'];
		let info = json['info'];
		if(response == 'ok'){
			if(info){
				$('#main-tip').html(info);
				$('#main-tip').toggleClass('tip');
				setTimeout(function(){
					$('#main-tip').removeClass('tip');
				}, 2000);
			}
		}else{
			$('#main-tip').html(info);
			$('#main-tip').toggleClass('fail-tip');
			setTimeout(function(){
				$('#main-tip').removeClass('fail-tip');
			}, 2000);
		}
		return true;
	}
	
	tipOut(info: string, type: string){
		if(type == 'success'){
			$('#main-tip').html(info);
			$('#main-tip').toggleClass('tip');
			setTimeout(function(){
				$('#main-tip').removeClass('tip');
			}, 2000);
		}else{
			$('#main-tip').html(info);
			$('#main-tip').toggleClass('fail-tip');
			setTimeout(function(){
				$('#main-tip').removeClass('fail-tip');
			}, 2000);
		}
	}
	
	// 提示信息
	tip: string;
}