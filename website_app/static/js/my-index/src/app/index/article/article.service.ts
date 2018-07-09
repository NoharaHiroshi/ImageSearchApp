declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Article } from '../../model/article';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ArticleService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getDetail(id: string): Promise<any> {
		const url = `/article_detail?id=` + id;
		let self = this;
		return this.http.get(url)
				   .toPromise().then(res => {
						let json = res.json();
						let article = self.jsonToObject(json.article, Article);
						json['article'] = article;
						return json;
					})
					.catch(this.handleError);
	}
}