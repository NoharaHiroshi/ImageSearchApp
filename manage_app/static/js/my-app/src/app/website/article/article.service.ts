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
	
	getArticle(): Promise<any> {
		const url = `/website/article_list`; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let article_list = self.jsonListToObjectList(json.article_list, Article);
					    json['article_list'] = article_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	del(ids: String): Promise<{}> {
		const url = '/website/article_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/website/article_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['article'] = self.jsonToObject(json.article, Article);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(article: Article): Promise<any> {
		const url = '/website/article_list/update';
	    return this.postForm(url, JSON.stringify(article));
	}
}