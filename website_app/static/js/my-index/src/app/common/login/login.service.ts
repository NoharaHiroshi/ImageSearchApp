import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Banner } from '../../model/banner';
import { WebsiteMenu } from '../../model/website_menu';
import { HotSearch } from '../../model/hot_search';
import { Customer } from '../../model/customer';

import { BaseService } from '../base.service';

@Injectable()
export class LoginService extends BaseService {
	
	constructor(http: Http) { 
		super(http);
	}
	
	login(params: any): Promise<any> {
		const url = '/login';
	    let res: any = this.postForm(url, JSON.stringify(params));
		res.user = this.jsonToObject(res.user, Customer);
		return res
	}
	
	register(params: any): Promise<any> {
		const url = '/register';
		return this.postForm(url, JSON.stringify(params));
	}

}