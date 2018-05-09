declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ImageDetailService } from './image_detail.service';
import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';
import { ImageTag } from '../../model/image_tag';
import { ImageSeriesCategory } from '../../model/image_series_category';

import { AppConfig } from '../../../config/app_config';

@Component({
  selector: 'image-detail-root',
  templateUrl: './image_detail.html',
})
export class ImageDetailComponent extends ListBaseComponent implements OnInit{
	image: Image;
	image_tags: ImageTag;
	image_url: String;
	
	constructor(private config: AppConfig, private service: ImageDetailService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
				this.image = res['image'];
				this.image_tags = res['image_tags'];
				this.isLoading = false;
				if(res['is_collected']){
					setTimeout(function(){
						$('.download-collect').text('已收藏');
						$('.download-collect').attr({"disabled":"disabled"});
					}, 100);
				}
	        });
	}
	
	checkImage(): void {
		let self = this;
		this.route.params.switchMap((params: Params) => this.service.checkDownloadImage(params['id']))
			.subscribe(res => {
				if(this.config.authCheck(res)){
					if(res['response'] == 'ok'){
						self.downloadSourceImage();
					}else{
						console.log(res['info']);
					}
				}
			});
	}
	
	downloadSourceImage(): void {
		let self = this;
		this.route.params.switchMap((params: Params) => this.service.getSourceImage(params['id']))
			.subscribe(url => {
				$('#download_png').attr({'href': url, 'download': self.image.name});
				$('#download_png')[0].click();
			});
	}
	
	collectImage(): void {
		let self = this;
		this.route.params.switchMap((params: Params) => this.service.addCollect(params['id']))
			.subscribe(res => {
				if(this.config.authCheck(res)){
					if(res['response'] == 'ok'){
						$('.download-collect').text('已收藏');
						$('.download-collect').attr({"disabled":"disabled"});
					}else{
						console.log(res['info']);
					}
				}
			});
	}
}