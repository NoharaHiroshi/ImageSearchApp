declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { UserRole } from '../../model/user_role';

import { BaseService } from '../../common/base.service';

@Injectable()
export class UserRoleService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getUserRoles(): Promise<any> {
		const url = `/manage/user_role_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let user_role_list = self.jsonListToObjectList(json.user_role_list, UserRole);
	           	        json['user_role_list'] = user_role_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/user_role_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['user_role'] = self.jsonToObject(json.user_role, UserRole);
						json['all_role_info'] = json.all_role_info;
						json['all_user_info'] = json.all_user_info;
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(user_role: UserRole): Promise<any> {
		const url = '/manage/user_role_list/update';
	    return this.postForm(url, JSON.stringify(user_role));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/user_role_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
}