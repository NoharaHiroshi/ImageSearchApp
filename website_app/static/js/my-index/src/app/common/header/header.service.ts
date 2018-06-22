import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Banner } from '../../model/banner';
import { WebsiteMenu } from '../../model/website_menu';
import { HotSearch } from '../../model/hot_search';
import { Customer } from '../../model/customer';

import { BaseService } from '../base.service';

@Injectable()
export class HeaderService extends BaseService {
	
	constructor(http: Http) { 
		super(http);
	}
	
	getInfo(): Promise<any> {
		const url = `/header`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
						let customer = self.jsonToObject(json.customer, Customer);
						json['customer'] = customer;
						let banner_list = self.jsonListToObjectList(json.banner_list, Banner);
						let website_menu_list = self.jsonListToObjectList(json.menu_list, WebsiteMenu);
					    for(let website_menu of website_menu_list){
							let _sub_menus = website_menu.sub_menus;
							website_menu.sub_menus = self.jsonListToObjectList(_sub_menus, WebsiteMenu);
							for(let sub_menu of website_menu.sub_menus){
								let _third_menus = sub_menu.sub_menus;
								sub_menu.sub_menus = self.jsonListToObjectList(_third_menus, WebsiteMenu);
							}
						} 
	           	        json['website_menu_list'] = website_menu_list;
						let hot_search_list = self.jsonListToObjectList(json.hot_search_list, HotSearch);
						json['banner_list'] = banner_list;
						json['hot_search_list'] = hot_search_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	logout(): Promise<any> {
		const url = `/logout`;
		let self = this;
		return this.http.get(url)
		.toPromise()
		.then(function(res){
			let json = res.json();
			return json;
		})
		.catch(this.handleError);
	}
	
	searchImage(): Promise<any> {
		const url = '/filter_image_list';
		let self = this;
		return this.http.get(url).toPromise().then(function(res){
			let json = res.json();
			let image_list = self.jsonListToObjectList(json.image_list, Image);
			json['image_list'] = image_list;
			return json;
		}).catch(this.handleError);
	}
	
	getBreadNav(current_url: any): Promise<{}> {
		console.log('current_url: ' + current_url);
		const url = '/bread_nav?url=' + current_url;
		let self = this;
		return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    return json;
	               })
	               .catch(this.handleError);
	}

}