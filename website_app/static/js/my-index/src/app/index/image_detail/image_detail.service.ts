declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../model/image_series';
import { Image } from '../../model/image';
import { ImageTag } from '../../model/image_tag';
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
						let image_tags = self.jsonListToObjectList(json.tag_list, ImageTag);
						json['image'] = image;
						json['image_tags'] = image_tags;
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
	
	addCollect(id: String): Promise<any> {
		const url = `/add_collect?collect_id=` + id + `&type=0`;
		let self = this;
		return this.http.get(url)
			.toPromise().then(res => {
				let json = res.json();
				return json;
			}).catch(this.handleError);
	}
}