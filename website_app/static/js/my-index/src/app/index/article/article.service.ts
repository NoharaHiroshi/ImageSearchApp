declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { Article } from '../../model/article';
import { Comment } from '../../model/comment';

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
						let comment_list = self.jsonListToObjectList(json.comment_list, Comment);
						for(let comment of comment_list){
							let reply_list = self.jsonListToObjectList(comment.reply_list, Comment);
							for(let r of reply_list){
								let r_list = self.jsonListToObjectList(r.reply_reply_list, Comment);
								r['reply_reply_list'] = r_list;
							}
							comment['reply_list'] = reply_list;
						}
						json['comment_list'] = comment_list;
						json['article'] = article;
						return json;
					})
					.catch(this.handleError);
	}
	
	reply(id: string, content: string, type: number, article_id: string): Promise<any> {
		const url = `/article_comment`;
		let self = this;
		let params = {
			'comment_id': id,
			'type': type,
			'article_id': article_id,
			'content': content
		}
		let json = this.postForm(url, JSON.stringify(params));
		let comment_list = self.jsonListToObjectList(json.comment_list, Comment);
		for(let comment of comment_list){
			let reply_list = self.jsonListToObjectList(comment.reply_list, Comment);
			for(let r of reply_list){
				let r_list = self.jsonListToObjectList(r.reply_reply_list, Comment);
				r['reply_reply_list'] = r_list;
			}
			comment['reply_list'] = reply_list;
		}
		json['comment_list'] = comment_list;
		return json;
	}
	
	delete(id: string, article_id: string): Promise<any> {
		const url = `/article_comment/delete`;
		let self = this;
		let params = {
			'comment_id': id,
			'article_id': article_id
		}
		let json = this.postForm(url, JSON.stringify(params));
		let comment_list = self.jsonListToObjectList(json.comment_list, Comment);
		for(let comment of comment_list){
			let reply_list = self.jsonListToObjectList(comment.reply_list, Comment);
			for(let r of reply_list){
				let r_list = self.jsonListToObjectList(r.reply_reply_list, Comment);
				r['reply_reply_list'] = r_list;
			} 
			comment['reply_list'] = reply_list;
		}
		json['comment_list'] = comment_list;
		return json;
	}
}