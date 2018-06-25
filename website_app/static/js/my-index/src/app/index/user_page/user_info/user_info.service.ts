declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Customer } from '../../../model/customer';

import { BaseService } from '../../../common/base.service';

@Injectable()
export class UserInfoService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(): Promise<any>{
		const url = `/user_info`; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(function(res){
						let json = res.json();
						let customer = self.jsonToObject(json.customer, Customer);
						json['customer'] = customer;
						return json;
					})
	}
	
	update(customer: Customer): Promise<any> {
		const url = '/update_user_info';
	    return this.postForm(url, JSON.stringify(customer));
	}
}