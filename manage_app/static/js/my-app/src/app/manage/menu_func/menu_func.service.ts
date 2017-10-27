declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { MenuFunc } from '../../model/menu_func';

import { BaseService } from '../../common/base.service';

@Injectable()
export class MenuFuncService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getMenus(): Promise<any> {
		const url = `/manage/menu_func_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let menu_func_list = self.jsonListToObjectList(json.menu_func_list, MenuFunc);
	           	        json['menu_func_list'] = menu_func_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/menu_func_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['menu_func'] = self.jsonToObject(json.menu_func, MenuFunc);
						json['menu_select_info'] = json.menu_select_info;
						json['func_select_info'] = json.func_select_info;
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(menu_func: MenuFunc): Promise<any> {
		const url = '/manage/menu_func_list/update';
	    return this.postForm(url, JSON.stringify(menu_func));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/menu_func_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}