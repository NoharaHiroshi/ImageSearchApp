declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Banner } from '../../model/banner';

import { BaseService } from '../../common/base.service';

@Injectable()
export class BannerService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getBanner(): Promise<any> {
		const url = `/website/banner_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let banner_list = self.jsonListToObjectList(json.banner_list, Banner);
	           	        json['banner_list'] = banner_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/banner_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['banner'] = self.jsonToObject(json.banner, Banner);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(banner: Banner): Promise<any> {
		const url = '/website/banner_list/update';
	    return this.postForm(url, JSON.stringify(banner));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/banner_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}