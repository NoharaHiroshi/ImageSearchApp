declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { CustomerDiscount } from '../../../model/customer_discount';

import { BaseService } from '../../../common/base.service';

@Injectable()
export class ExchangeCodeService extends BaseService {
	
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(): Promise<any> {
		const url = '/auth_user_page';
		let self = this;
		return this.http.get(url).toPromise().then(function(res){
			let json = res.json();
			return json;
		});
	}

	exchange(exchange_code: String): Promise<any> {
		let params = {
			'code': exchange_code 
		}
		const url = '/exchange_code';
	    return this.postForm(url, JSON.stringify(params));
	}
}