declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { HotSearch } from '../../model/hot_search';

import { BaseService } from '../../common/base.service';

@Injectable()
export class HotSearchService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getHotSearch(): Promise<any> {
		const url = `/website/hot_search_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let hot_search_list = self.jsonListToObjectList(json.hot_search_list, HotSearch);
	           	        json['hot_search_list'] = hot_search_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/hot_search_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['hot_search'] = self.jsonToObject(json.hot_search, HotSearch);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(hot_search: HotSearch): Promise<any> {
		const url = '/website/hot_search_list/update';
	    return this.postForm(url, JSON.stringify(hot_search));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/hot_search_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}