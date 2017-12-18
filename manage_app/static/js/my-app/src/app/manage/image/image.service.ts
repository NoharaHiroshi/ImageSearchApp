declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getImageInfo(): Promise<any> {
		const url = `/manage/image_info`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_series_list = self.jsonListToObjectList(json.image_series_list, Image);
	           	        json['image_series_list'] = image_series_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getImages(page: number, queryParams: {}): Promise<any> {
		let self = this;
		queryParams = $.param(queryParams);
		const url = `/manage/image_list?page=${page}&${queryParams}`; 
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
	
	update(imageSeries: ImageSeries): Promise<any> {
		const url = '/manage/image_series_list/update';
	    return this.postForm(url, JSON.stringify(imageSeries));
	}
	
	setCover(image_id: String, series_id: String): Promise<any> {
		const url = '/manage/set_image_cover';
		let params = {
			'image_id': image_id,
			'series_id': series_id
		}
	    return this.postForm(url, JSON.stringify(params));
	}
	
	addImageToSeries(image_id: String, series_id: String): Promise<any> {
		const url = '/manage/add_image_to_series';
		let params = {
			'image_id': image_id,
			'series_id': series_id
		}
	    return this.postForm(url, JSON.stringify(params));
	}
	
	addImageToTag(image_id: String, tag_id: String): Promise<any> {
		const url = '/manage/add_image_to_tag';
		let params = {
			'image_id': image_id,
			'tag_id': tag_id
		}
	    return this.postForm(url, JSON.stringify(params));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}