declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../../../../my-app/src/app/model/image_series';
import { ImageSeriesCategory } from '../../../../../my-app/src/app/model/image_series_category';

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
}