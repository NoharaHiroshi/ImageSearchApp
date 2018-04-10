declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Discount } from '../../model/discount';

import { BaseService } from '../../common/base.service';

@Injectable()
export class DiscountService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDiscount(): Promise<any> {
		const url = `/website/discount_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let discount_list = self.jsonListToObjectList(json.discount_list, Discount);
	           	        json['discount_list'] = discount_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/discount_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['discount'] = self.jsonToObject(json.discount, Discount);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(discount: Discount): Promise<any> {
		const url = '/website/discount_list/update';
	    return this.postForm(url, JSON.stringify(discount));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/discount_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}