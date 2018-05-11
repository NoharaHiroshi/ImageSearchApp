declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../model/image_series';
import { ImageSeriesCategory } from '../../model/image_series_category';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageSeriesListService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(id: String, page: number): Promise<{}> {
		const url = `/series_list_page?id=` + id + `&page=` + page; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(res => {
						let json = res.json();
						let series_category = self.jsonToObject(json.series_category, ImageSeriesCategory);
						json['series_category'] = series_category;
						let series_list = self.jsonListToObjectList(json.series_list, ImageSeries);
						json['series_list'] = series_list;
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