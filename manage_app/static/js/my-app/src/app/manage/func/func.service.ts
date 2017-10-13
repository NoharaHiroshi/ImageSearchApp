declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Func } from '../../model/func';

import { BaseService } from '../../common/base.service';

@Injectable()
export class FuncService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getFuncs(): Promise<any> {
		const url = `/manage/func_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let func_list = self.jsonListToObjectList(json.func_list, Func);
	           	        json['func_list'] = func_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
}