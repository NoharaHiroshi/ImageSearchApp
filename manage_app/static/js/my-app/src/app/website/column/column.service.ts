declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Column } from '../../model/column';
import { ColumnSeries } from '../../model/column_series';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ColumnService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getColumn(): Promise<any> {
		const url = `/website/column_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let column_list = self.jsonListToObjectList(json.column_list, Column);
	           	        json['column_list'] = column_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/column_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['column'] = self.jsonToObject(json.column, Column);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(column: Column): Promise<any> {
		const url = '/website/column_list/update';
	    return this.postForm(url, JSON.stringify(column));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/column_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	getSetDetail(id: String): Promise<{}> {
		const url = '/website/column_list/set?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['column'] = self.jsonToObject(json.column, Column);
						json['column_series_rel_list'] = self.jsonListToObjectList(json.column_series_rel_list, ColumnSeries);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	set(column_id: string, series_id_list: string): Promise<any> {
		let info = {
			'column_id': column_id,
			'series_id_list': series_id_list
		}
		const url = '/website/column_list/set_update';
	    return this.postForm(url, JSON.stringify(info));
	}
	
	set_del(ids: String): Promise<{}> {
		const url = '/website/column_list/set_delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	set_visible(ids: String): Promise<{}> {
		const url = '/website/column_list/set_visible';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	set_hidden(ids: String): Promise<{}> {
		const url = '/website/column_list/set_hidden';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}