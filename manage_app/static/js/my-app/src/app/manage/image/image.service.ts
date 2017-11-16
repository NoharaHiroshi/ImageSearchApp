declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Image } from '../../model/image';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getImages(): Promise<any> {
		const url = `/manage/image_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_list = self.jsonListToObjectList(json.image_list, Image);
	           	        json['image_list'] = image_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}