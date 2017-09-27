declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { BaseService } from './base.service';
import { Menu } from '../model/manage/permission/menu';
import { User } from '../model/manage/permission/user';
import { Org } from '../model/crm/permission/org';


@Injectable()
export class NavService extends BaseService{
	constructor(http: Http) { 
		super(http);
	}
	
	getMenus(module:string): Promise<any> {
		const url = `/common/my/menus?module=${module}`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
	            	   let json = res.json();
	            	   let menu_list = self.jsonListToObjectList(json.menu_list, Menu);
	           	       let result = {
	           	    		menu_list: menu_list,
	           	    		perm_list: json.perm_list
	           	       }
	            	   return result;
	               })
	               .catch(this.handleError);
	}
	
	getNavMenus(): Promise<any> {
		const url = `/common/nav/menus`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
	            	   let json = res.json();
	            	   let menu_list = self.jsonListToObjectList(json.menu_list, Menu);
	           	       let result = {
	           	    		menu_list: menu_list,
	           	       }
	            	   return result;
	               })
	               .catch(this.handleError);
	}
	
	getCurUser(): Promise<User> {
		const url = `/common/curuser`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
	            	   let json = res.json();
	            	   let user = self.jsonToObject(json['user'], User);
	            	   return user;
	               })
	               .catch(this.handleError);
	}
	
	getFilterOrgList(level:string): Promise<{}> {
		const url = `/common/org/filter/list?level=${level}`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
	           	       let json = res.json();
			     	   json['data_list'] = self.jsonListToObjectList(json.data_list, Org);
	            	   return json;
	               })
	               .catch(this.handleError);
	}
	
}