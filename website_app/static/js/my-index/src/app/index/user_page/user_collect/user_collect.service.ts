declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Customer } from '../../../model/customer';
import { CustomerCollect } from '../../../model/customer_collect';
import { Image } from '../../../model/image';

import { BaseService } from '../../../common/base.service';

@Injectable()
export class UserCollectService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(): Promise<any>{
		const url = `/user_collect`; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(function(res){
						let json = res.json();
						let image_list = self.jsonListToObjectList(json.image_list, Image);
						json['image_list'] = image_list;
						return json;
					})
	}
	
}