declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

require('../../lib/blob');

import { ImageSeries } from '../../model/image_series';
import { Image } from '../../model/image';
import { ImageSeriesCategory } from '../../model/image_series_category';

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
	
	checkDownloadImage(id: String): Promise<any> {
		const url = `/check_image?id=` + id;
		let self = this;
		return this.http.get(url)
			.toPromise().then(res => {
				let json = res.json();
				return json;
			}).catch(this.handleError);
	}
	
	getSourceImage(id: String): Promise<any> {
		const url = `/image_full_url?id=` + id;
		let self = this;
		let headers = new Headers({ 'Content-Disposition': 'attachement' }); 
		let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: headers });
		return this.http.get(url, options).toPromise()
		.then(data => {
			let url= window.URL.createObjectURL(data['_body']);
			return url;
		});
	}
}