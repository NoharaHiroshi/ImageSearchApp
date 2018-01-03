import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { BaseService } from '../base.service';

@Injectable()
export class FooterService extends BaseService {
	
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
	            	    return json;
	               })
	               .catch(this.handleError);
	}

}