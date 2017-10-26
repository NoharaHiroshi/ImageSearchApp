declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Menu } from '../../model/menu';

import { BaseService } from '../../common/base.service';

@Injectable()
export class MenuService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getMenus(): Promise<any> {
		const url = `/manage/menu_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let menu_list = self.jsonListToObjectList(json.menu_list, Menu);
					    for(let menu of menu_list){
							let _sub_menus = menu.sub_menus;
							menu.sub_menus = self.jsonListToObjectList(_sub_menus, Menu)
						} 
	           	        json['menu_list'] = menu_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/menu_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['menu'] = self.jsonToObject(json.menu, Menu);
						json['menu_select_info'] = json.menu_select_info;
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(menu: Menu): Promise<any> {
		const url = '/manage/menu_list/update';
	    return this.postForm(url, JSON.stringify(menu));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/menu_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}