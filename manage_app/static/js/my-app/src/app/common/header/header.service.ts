import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { User } from '../../model/user';

import { BaseService } from '../base.service';

@Injectable()
export class HeaderService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getInfo(): Promise<any> {
		const url = `/manage/header`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let user = self.jsonToObject(json.user, User);
						json['user'] = user;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	logout(): Promise<any> {
		const url = `/manage/logout`; 
	    return this.http.get(url);
	}
}