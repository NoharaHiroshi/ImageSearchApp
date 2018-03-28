import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { User } from '../model/user';

@Injectable()
export class AppConfig {
	name = '测试项目';
    version = '1.0.0';
	
	// 当前Module
	module: any;
	
	// 当前用户信息
	user: User;
	// 存储临时跳转路由
	tmp_url: string = '/';
}