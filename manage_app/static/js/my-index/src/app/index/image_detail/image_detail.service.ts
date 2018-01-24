declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../../../../my-app/src/app/model/image_series';
import { Image } from '../../../../../my-app/src/app/model/image';
import { ImageSeriesCategory } from '../../../../../my-app/src/app/model/image_series_category';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageDetailService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = `/image_detail?id=` + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(res => {
						let json = res.json();
						let image = self.jsonToObject(json.image, Image);
						json['image'] = image;
						return json;
					})
					.catch(this.handleError);
	}
	
	getSourceImage(id: String): Promise<{}> {
		const url = `/image_full_url?id=` + id;
		let self = this;
		return this.http.get(url)
				   .toPromise().then(res => {
						let json = res.json();
						return json;
					})
					.catch(this.handleError);
	}
}