declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { WebsiteMenu } from '../../model/website_menu';

import { BaseService } from '../../common/base.service';

@Injectable()
export class WebsiteMenuService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getMenus(): Promise<any> {
		const url = `/website/website_menu_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let menu_list = self.jsonListToObjectList(json.menu_list, WebsiteMenu);
					    for(let menu of menu_list){
							let _sub_menus = menu.sub_menus;
							menu.sub_menus = self.jsonListToObjectList(_sub_menus, WebsiteMenu);
							for(let sub_menu of menu.sub_menus){
								let _third_menus = sub_menu.sub_menus;
								sub_menu.sub_menus = self.jsonListToObjectList(_third_menus, WebsiteMenu);
							}
						} 
	           	        json['menu_list'] = menu_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/website_menu_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['menu'] = self.jsonToObject(json.menu, WebsiteMenu);
						json['menu_select_info'] = json.menu_select_info;
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(menu: WebsiteMenu): Promise<any> {
		const url = '/website/website_menu_list/update';
	    return this.postForm(url, JSON.stringify(menu));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/website_menu_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	changeSort(menu_id: String, change_method: String): Promise<any> {
		const url = '/website/website_menu_list/menu_sort_change';
		let params = {
			'menu_id': menu_id,
			'change_method': change_method
		}
		return this.postForm(url, JSON.stringify(params));
	}
}