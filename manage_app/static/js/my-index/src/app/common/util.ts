import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'X-Requested-By': 'Angular2',
    });

    merge(options?: RequestOptionsArgs): RequestOptions {
    	var newOptions = super.merge(options);
    	newOptions.headers.set('X-Requested-At', new Date().toISOString());
    	return newOptions;
	}
}