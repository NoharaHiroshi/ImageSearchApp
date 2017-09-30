import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { ViewContainerRef, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/toPromise';


export class BaseService {
	http: Http;

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
	
}
