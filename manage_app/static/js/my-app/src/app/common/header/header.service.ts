import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { User } from '../../model/user';
import { Module } from '../../model/module';

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
	            	    let user = self.jsonToObject(json.user, User);
						let module_list = self.jsonListToObjectList(json.module_list, Module);
						json['user'] = user;
						json['module_list'] = module_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}

}