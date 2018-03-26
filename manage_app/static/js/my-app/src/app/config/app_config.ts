import { Injectable } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';


@Injectable()
export class AppConfig {
	name = '测试项目';
    version = '1.0.0';
	
	// 当前Module
	module: any;
	
	// 当前用户信息
	user: any;
	// 存储临时跳转路由
	tmp_url: string;
}