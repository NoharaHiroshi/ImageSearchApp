import { Injectable } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';


@Injectable()
export class AppConfig {
	name = '测试项目-前端';
    version = '1.0.0';
	// 静态资源服务器
	resource_url = 'http://127.0.0.1:8888';
}