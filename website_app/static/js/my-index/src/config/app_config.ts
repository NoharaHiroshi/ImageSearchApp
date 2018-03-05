import { Injectable } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';


@Injectable()
export class AppConfig {
	name = '测试项目-前端';
    version = '1.0.0';
	// 静态资源服务器
	resource_url = 'http://127.0.0.1:8888';
	
	// 登陆页面开关
    isLoginOpen = false;
	
	// 登陆权限验证
	authCheck(json: any){
		let response = json['response'];
		if(response == 'NeedLogin'){
			// 验证需要登录时，打开登陆页面
			this.isLoginOpen = true;
			return false;
		}else{
			this.isLoginOpen = false;
			return true;
		}
	}
}