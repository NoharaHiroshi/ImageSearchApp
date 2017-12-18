declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../model/image_series';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageSeriesService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getImageSeries(): Promise<any> {
		const url = `/manage/image_series_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_series_list = self.jsonListToObjectList(json.image_series_list, ImageSeries);
	           	        json['image_series_list'] = image_series_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getImages(page: number, series_id: any): Promise<any> {
		let self = this;
		const url = `/manage/image_series_list/series_image_list?page=${page}&series_id=${series_id}`; 
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
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/image_series_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['image_series'] = self.jsonToObject(json.image_series, ImageSeries);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(imageSeries: ImageSeries): Promise<any> {
		const url = '/manage/image_series_list/update';
	    return this.postForm(url, JSON.stringify(imageSeries));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_series_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	removeImageFromSeries(image_ids: String, series_id: String): Promise<{}> {
		const url = '/manage/image_series_list/remove_image_from_series';
		let params = {
			'image_id': image_ids,
			'series_id': series_id
		}
		return this.postForm(url, JSON.stringify(params));
	}
}