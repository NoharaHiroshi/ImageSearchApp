declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeriesCategory } from '../../model/image_series_category';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageSeriesCategoryService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getImageSeriesCategory(): Promise<any> {
		const url = `/manage/image_series_category_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_series_category_list = self.jsonListToObjectList(json.image_series_category_list, ImageSeriesCategory);
	           	        json['image_series_category_list'] = image_series_category_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/image_series_category_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['image_series_category'] = self.jsonToObject(json.image_series_category, ImageSeriesCategory);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(imageSeriesCategory: ImageSeriesCategory): Promise<any> {
		const url = '/manage/image_series_category_list/update';
	    return this.postForm(url, JSON.stringify(imageSeriesCategory));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_series_category_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}