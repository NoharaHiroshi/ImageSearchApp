import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Banner } from '../../../../../my-app/src/app/model/banner';
import { WebsiteMenu } from '../../../../../my-app/src/app/model/website_menu';
import { HotSearch } from '../../../../../my-app/src/app/model/hot_search';

import { BaseService } from '../base.service';

@Injectable()
export class HeaderService extends BaseService {
	
	constructor(http: Http) { 
		super(http);
	}
	
	getInfo(): Promise<any> {
		const url = `/website/header`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
						let banner_list = self.jsonListToObjectList(json.banner_list, Banner);
						let website_menu_list = self.jsonListToObjectList(json.menu_list, WebsiteMenu);
						let website_menu_list = self.jsonListToObjectList(json.menu_list, WebsiteMenu);
					    for(let website_menu of website_menu_list){
							let _sub_menus = website_menu.sub_menus;
							website_menu.sub_menus = self.jsonListToObjectList(_sub_menus, WebsiteMenu)
						} 
	           	        json['website_menu_list'] = website_menu_list;
						let hot_search_list = self.jsonListToObjectList(json.hot_search_list, HotSearch);
						json['banner_list'] = banner_list;
						json['hot_search_list'] = hot_search_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}

}