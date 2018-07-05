declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../model/image_series';
import { Image } from '../../model/image';
import { ImageSeriesCategory } from '../../model/image_series_category';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageListService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(id: String, page: number): Promise<{}> {
		const url = `/image_list_page?id=` + id + `&page=` + page; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(res => {
						let json = res.json();
						let image_series = self.jsonToObject(json.image_series, ImageSeries);
						json['image_series'] = image_series;
						let image_list = self.jsonListToObjectList(json.image_list, Image);
						json['image_list'] = image_list;
						return json;
					})
					.catch(this.handleError);
	}
	
	addCollect(id: String): Promise<any> {
		const url = `/add_collect?collect_id=` + id + `&type=1`;
		let self = this;
		return this.http.get(url)
			.toPromise().then(res => {
				let json = res.json();
				return json;
			}).catch(this.handleError);
	}
}