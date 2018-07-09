declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, DoCheck, Input, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { Article } from '../../model/article';

import { ArticleService } from './article.service';

import { AppConfig } from '../../config/app_config';

@Component({
  selector: 'article-root',
  templateUrl: './article_list.html',
})
export class ArticleConfComponent extends ListBaseComponent{
	article_list: Article[];
	result: string;
	
	constructor(private service: ArticleService, public config: AppConfig) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getArticle().then(data => {
        	this.article_list = data.article_list;
			this.isLoading = false;
        });
	}
	
	del(): void {
		let del_ids = this.selectChecked();
		let self = this;
		swal({
			title: '删除',
			text: '确定删除当前数据？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '删除',
			cancelButtonText: '取消',
			confirmButtonClass: 'btn btn-theme04 margin-right10',
			cancelButtonClass: 'btn btn-theme03',
			buttonsStyling: false
		}).then(function(isConfirm: boolean) {
			if(isConfirm === true){
				self.service.del(del_ids).then(data =>{
					if(data['response'] == 'ok'){
						swal('已删除');
						self.refresh();
					}else{
						swal('删除失败', data['info']);
						self.refresh();
					}
				})
			}else if (isConfirm === false){
				self.refresh();
			}else{
				self.refresh();
			}
		});
	}
}

@Component({
  selector: 'article-detail-root',
  templateUrl: './article_detail.html',
})
export class ArticleConfDetailComponent extends ListBaseComponent{
	article: Article;
	
	constructor(private service: ArticleService, public route: ActivatedRoute, public router: Router, public config: AppConfig) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.article = res['article'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		this.service.update(this.article).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', '保存失败');
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
				this.goBack();
			}
		});
	} 
}