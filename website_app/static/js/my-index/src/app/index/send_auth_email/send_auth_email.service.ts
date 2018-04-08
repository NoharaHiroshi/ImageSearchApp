declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Column } from '../../model/column';

import { BaseService } from '../../common/base.service';
import { User } from '../../model/user';

@Injectable()
export class SendAuthEmailService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getUserInfo(): Promise<any>{
		const url = `/auth_customer_page`; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(function(res){
						let json = res.json();
						let user = self.jsonToObject(json.user, User);
						json['user'] = user;
						return json;
					})
	}
}