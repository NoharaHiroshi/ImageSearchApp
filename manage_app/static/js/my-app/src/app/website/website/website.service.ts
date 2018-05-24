declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { WebsiteInfo } from '../../model/website_info';

import { BaseService } from '../../common/base.service';

@Injectable()
export class WebsiteInfoService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getWebsiteInfo(): Promise<any> {
		const url = `/website/website_info`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let website_info = self.jsonToObject(json.website_conf, WebsiteInfo);
					    json['website_info'] = website_info;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	update(website_info: WebsiteInfo): Promise<any> {
		const url = '/website/website_info/update';
	    return this.postForm(url, JSON.stringify(website_info));
	}
}