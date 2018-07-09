declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ArticleService } from './article.service';
import { ListBaseComponent } from '../../common/base.component';

import { Article } from '../../model/article';

import { AppConfig } from '../../../config/app_config';

@Component({
  selector: 'article-root',
  templateUrl: './article.html',
})
export class ArticleComponent extends ListBaseComponent implements OnInit{
	article: Article;
	
	constructor(public config: AppConfig, private service: ArticleService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		this.config.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
		.subscribe(res => {
			self.article = res.article;
			self.config.isLoading = false;
		})
	}
}