declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ArticleService } from './article.service';
import { ListBaseComponent } from '../../common/base.component';

import { Article } from '../../model/article';
import { Comment } from '../../model/comment';

import { AppConfig } from '../../../config/app_config';

@Component({
  selector: 'article-root',
  templateUrl: './article.html',
})
export class ArticleComponent extends ListBaseComponent implements OnInit{
	article: Article;
	comment_list: Comment[];
	
	constructor(public config: AppConfig, private service: ArticleService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		this.config.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
		.subscribe(res => {
			self.article = res.article;
			self.comment_list = res.comment_list;
			self.config.isLoading = false;
		})
	}
	
	cancel(id: string): void {
		$('#textarea_' + id).hide();
		$('#' + id).show();
	}
	
	reply(id: string, type: number): void {
		let self = this;
		$('#textarea_' + id).hide();
		$('#' + id).show();
		let content = $('#reply_' + id).val();
		this.service.reply(id, content, type, self.article.id).then(res => {
			if(self.config.authCheck(res)){
				if(self.config.tipCheck(res)){
					self.comment_list = res.comment_list;
				}
			}
		})
	}
	
	replyComment(id: string, type: number): void {
		let self = this;
		$('#textarea_' + id).hide();
		$('#' + id).show();
		let content = $('#reply_' + id).val();
		this.service.reply(id, content, type, self.article.id).then(res => {
			if(self.config.authCheck(res)){
				if(self.config.tipCheck(res)){
					self.comment_list = res.comment_list;
				}
			}
		})
	}
	
	articleComment(id: string, type: number): void {
		let self = this;
		let content = $('#reply_' + id).val();
		this.service.reply(id, content, type, self.article.id).then(res => {
			if(self.config.authCheck(res)){
				if(self.config.tipCheck(res)){
					self.comment_list = res.comment_list;
				}
			}
		})
	}
	
	clickReply(id: string): void {
		let self = this;
		if(self.config.user){
			$('#' + id).hide();
			$('#textarea_' + id).show();
		}else{
			self.config.tipOut('登录之后才可以评论哦~', 'fail');
		}
	}
	
	deleteReply(id: string): void {
		let self = this;
		this.service.delete(id, self.article.id).then(res => {
			if(self.config.authCheck(res)){
				if(self.config.tipCheck(res)){
					self.comment_list = res.comment_list;
				}
			}
		})
	}
}