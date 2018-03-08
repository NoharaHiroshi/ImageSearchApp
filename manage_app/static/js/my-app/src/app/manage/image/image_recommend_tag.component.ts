declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { ImageRecommendTagService } from './image_tag.service'
import { ImageTag } from '../../model/image_tag';
import { Image } from '../../model/image';

import { ImageService } from './image.service'
import { ImageQueryComponent } from '../../common/image_list/image_list.component';

@Component({
  selector: 'image-recommend-tag-root',
  templateUrl: './image_recommend_tag_list.html',
})
export class ImageRecommendTagConfComponent extends ListBaseComponent{
	image_recommend_tag_list: ImageTag[];
	
	constructor(private service: ImageRecommendTagService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getRecommendImageTag().then(data => {
        	this.image_recommend_tag_list = data.image_recommend_tag_list;
			this.isLoading = false;
        });
	}
}

@Component({
  selector: 'image-recommend-tag-detail-root',
  templateUrl: './image_recommend_tag_detail.html',
})
export class ImageRecommendTagConfDetailComponent extends ListBaseComponent{
	imageRecommendTag: ImageRecommendTag;
	
	constructor(private service: ImageRecommendTagService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.imageRecommendTag = res['image_recommend_tag'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/image_recommend_tag_conf']);
	}
	
	save(): void {
		this.service.update(this.imageRecommendTag).then(res => {
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