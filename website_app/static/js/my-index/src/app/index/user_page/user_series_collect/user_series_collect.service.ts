declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Customer } from '../../../model/customer';
import { CustomerCollect } from '../../../model/customer_collect';
import { ImageSeries } from '../../../model/image_series';

import { BaseService } from '../../../common/base.service';

@Injectable()
export class UserSeriesCollectService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(): Promise<any>{
		const url = `/user_series_collect`; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(function(res){
						let json = res.json();
						let image_series_list = self.jsonListToObjectList(json.image_series_list, ImageSeries);
						json['image_series_list'] = image_series_list;
						return json;
					})
	}
	
}