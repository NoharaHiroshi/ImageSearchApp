declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Column } from '../../../../../my-app/src/app/model/column';

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
						json['column_list'] = column_list;
						return json;
					})
	}
}