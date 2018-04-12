declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Customer } from '../../model/customer';
import { Discount } from '../../model/discount';
import { CustomerDiscount } from '../../model/customer_discount';

import { BaseService } from '../../common/base.service';

@Injectable()
export class CustomerService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getCustomer(): Promise<any> {
		const url = `/website/customer_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let customer_list = self.jsonListToObjectList(json.customer_list, Customer);
						for(let customer of customer_list){
							let customer_discount = self.jsonToObject(customer.customer_discount, CustomerDiscount);
							customer.customer_discount = customer_discount;
						}
	           	        json['customer_list'] = customer_list;
						console.log(json);
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/customer_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['customer'] = self.jsonToObject(json.customer, Customer);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(customer: Customer): Promise<any> {
		const url = '/website/customer_list/update';
	    return this.postForm(url, JSON.stringify(customer));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/customer_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	getCusomterDiscountDetail(id: String): Promise<{}> {
		const url = '/website/customer_list/get_discount';
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['disocunt_list'] = self.jsonListToObjectList(json.discount_list, Discount);
						json['customer_discount'] = self.jsonToObject(json.customer_discount, CustomerDiscount);
						return json;
				   })
				   .catch(this.handleError);
	}
	
	updateCustomerDiscount(customer_disocunt: CustomerDiscount): Promise<any> {
		const url = '/website/customer_list/set_discount';
	    return this.postForm(url, JSON.stringify(customer_disocunt));
	}
}