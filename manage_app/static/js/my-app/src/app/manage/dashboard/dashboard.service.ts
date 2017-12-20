declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { DashboardInfo } from '../../model/dashboard';
import { BaseService } from '../../common/base.service';

@Injectable()
export class DashboardService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDashboardInfo(): Promise<any>{
		const url = `/manage/dashboard/info`; 
		let self = this;
		return this.http.get(url)
					.toPromise().then(function(res){
						let json = res.json();
						let dashboard_info = self.jsonToObject(json.dashboard_info, DashboardInfo);
						json['dashboard_info'] = dashboard_info;
						return json;
			   })
	}
}