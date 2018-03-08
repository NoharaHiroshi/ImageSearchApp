declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageRecommendTag } from '../../model/image_recommend_tag';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageRecommendTagService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getRecommendImageTag(): Promise<any> {
		const url = `/manage/image_recommend_tag_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_recommend_tag_list = self.jsonListToObjectList(json.image_recommend_tag_list, ImageRecommendTag);
	           	        json['image_recommend_tag_list'] = image_recommend_tag_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/image_recommend_tag_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['image_recommend_tag'] = self.jsonToObject(json.image_recommend_tag, ImageRecommendTag);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(imageRecommendTag: ImageRecommendTag): Promise<any> {
		const url = '/manage/image_recommend_tag_list/update';
	    return this.postForm(url, JSON.stringify(imageRecommendTag));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_recommend_tag_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}