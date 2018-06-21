declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { BaseService } from '../base.service';
import { User } from '../../model/user';

@Injectable()
export class CheckLoginService extends BaseService {
	constructor(http: Http){
		super(http);
	}
	
	checkLogin(): Promise<any> {
		const url = '/get_cur_user';
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(function(res){
						let json = res.json();
						let user = self.jsonToObject(json['user'], User);
						json['user'] = user;
						return json;
					})
					.catch(this.handleError);
	}
}