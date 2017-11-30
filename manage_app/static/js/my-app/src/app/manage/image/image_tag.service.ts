declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageTag } from '../../model/image_tag';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageTagService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getImageTag(): Promise<any> {
		const url = `/manage/image_tag_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_tag_list = self.jsonListToObjectList(json.image_tag_list, ImageTag);
	           	        json['image_tag_list'] = image_tag_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/image_tag_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['image_tag'] = self.jsonToObject(json.image_tag, ImageTag);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(imageTag: ImageTag): Promise<any> {
		const url = '/manage/image_tag_list/update';
	    return this.postForm(url, JSON.stringify(imageTag));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_tag_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	removeImageFromTag(image_ids: String, tag_id: String): Promise<{}> {
		const url = '/manage/image_tag_list/remove_image_from_tag';
		let params = {
			'image_id': image_ids,
			'tag_id': tag_id
		}
		return this.postForm(url, JSON.stringify(params));
	}
}