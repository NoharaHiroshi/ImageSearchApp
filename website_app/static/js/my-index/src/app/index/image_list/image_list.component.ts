declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ImageListService } from './image_list.service';
import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';
import { ImageSeriesCategory } from '../../model/image_series_category';

import { AppConfig } from '../../../config/app_config';

require('../../lib/masonry.min.js');
require('../../lib/jquery.flex-images.js');

@Component({
  selector: 'image-list-root',
  templateUrl: './image_list.html',
})
export class ImageListComponent extends ListBaseComponent implements OnInit{
	image_series: ImageSeries;
	image_list: Image[];
	page_info: any;
	page: number = 1;
	
	constructor(private config: AppConfig, private service: ImageListService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		this.config.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0', this.page))
	        .subscribe(res => {
				this.image_series = res['image_series'];
	        	this.image_list = res['image_list'];
				this.page_info = res['meta'];
				this.config.isLoading = false;
	        });
	}
	
	getPageNum(page: any): void{
		this.page = page;
		this.getPagerData();
	}
	
	@ViewChildren('witem')
	witem: ElementRef;
	
	@ViewChild('demo')
	demo: ElementRef;
	
	ngAfterViewChecked(): void{
		let self = this;
		let _height = 280;
		let demo_width = $('#demo').width(),
			image_divs = $('.image-item');
		if(this.image_list){
			if(this.image_list.length == image_divs.length){
				for(let i=0; i<image_divs.length; i++){
					let image_div = image_divs[i],
						image_obj = this.image_list[i],
						_w = _height / image_obj.height * image_obj.width,
						_h = _height;
					$(image_div).attr('data-w', _w);
					$(image_div).attr('data-h', _h);
				}
			}
			$(this.demo.nativeElement).flexImages({rowHeight: 300, container: '.image-item' });
		}
	}
}