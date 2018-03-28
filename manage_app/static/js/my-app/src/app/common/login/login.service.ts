declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { BaseService } from '../base.service';

@Injectable()
export class LoginService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getLoginPage(): Promise<any> {
		const url = '/get_login_page'; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	login(username: string, password: string, token: string): Promise<any> {
		const url = '/login';
		let login_info = {
			'username': username,
			'password': password,
			'token': token
		}
	    return this.postForm(url, JSON.stringify(login_info));
	}

}