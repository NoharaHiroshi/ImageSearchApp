declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageSeries } from '../../model/image_series';
import { Column } from '../../model/column';

import { BaseService } from '../../common/base.service';

@Injectable()
export class MainPageService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getMainPageInfo(): Promise<any>{
		const url = `/main_page`; 
		let self = this;
		return this.http.get(url)
				   .toPromise().then(function(res){
						let json = res.json();
						let column_list = self.jsonListToObjectList(json.column_list, Column);
						for(let column of column_list){
							let series_list = self.jsonListToObjectList(column.series_list, ImageSeries);
							column.series_list = series_list;
						}
						json['column_list'] = column_list;
						return json;
					})
	}
}