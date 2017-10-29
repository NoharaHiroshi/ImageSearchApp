declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Role } from '../../model/role';

import { BaseService } from '../../common/base.service';

@Injectable()
export class RoleService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getRoles(): Promise<any> {
		const url = `/manage/role_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let role_list = self.jsonListToObjectList(json.role_list, Role);
	           	        json['role_list'] = role_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/role_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['role'] = self.jsonToObject(json.role, Role);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(role: Role): Promise<any> {
		const url = '/manage/role_list/update';
	    return this.postForm(url, JSON.stringify(role));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/role_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	getRolePermissionDetail(id: String): Promise<{}> {
		const url = '/manage/role_list/permission/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['role'] = self.jsonToObject(json.role, Role);
						json['all_menu_func_list'] = json.all_menu_func_list;
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	updateRolePermission(role: Role): Promise<any> {
		const url = '/manage/role_list/permission/update';
	    return this.postForm(url, JSON.stringify(role));
	}
}