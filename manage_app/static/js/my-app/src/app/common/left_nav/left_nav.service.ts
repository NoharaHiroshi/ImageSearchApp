import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Menu } from '../../model/menu';

import { BaseService } from '../base.service';

@Injectable()
export class LeftNavService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getMenus(): Promise<any> {
		const url = `/manage/nav`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
	            	   let json = res.json();
	            	   let menu_list = self.jsonListToObjectList(json.menu_list, Menu);
	           	       json['menu_list'] = menu_list;
	            	   return json;
	               })
	               .catch(this.handleError);
	}
	
}