import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DefaultRequestOptions } from './util';

import { ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AppConfig} from '../config/app_config';


export class BaseService {
	http:Http;
	project_id: string;
	constructor(http: Http) { 
		this.http = http;
	}
	
	handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}
	
	public jsonListToObjectList(json_list:any, cls:any):any{
		let new_list = [];
 	    for (let i in json_list) {
		    let c = new cls();
		    Object.assign(c , json_list[i]);
		    new_list.push(c);
	    }
 	    
 	    return new_list;
	}
	
	public jsonToObject(json:any, cls:any):any{
	    let c = new cls();
	    Object.assign(c , json);
 	    return c;
	}
	
	public postForm(url: any, body: string): Promise<{}> {
	    var options = new DefaultRequestOptions();
	    options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    
	    var body = $.param(JSON.parse(body));
		return this.http
			    .post(url, body, options)
			    .toPromise()
			    .then(response => response.json())
			    .catch(this.handleError);
	}
	
	public postJsonForm(url: any, body: string): Promise<{}> {
	    var options = new DefaultRequestOptions();
	    options.headers.append('Content-Type', 'application/json');
	    
	    //var body = $.param(JSON.parse(body));
		return this.http
			    .post(url, body, options)
			    .toPromise()
			    .then(response => response.json())
			    .catch(this.handleError);
	}
	
	public post(url: any, data: {}): Promise<{}> {
		return this.postForm(url, JSON.stringify(data))
	}
}
