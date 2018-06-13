declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { FilterImageListService } from './filter_image_list.service';
import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';
import { ImageSeriesCategory } from '../../model/image_series_category';

import { AppConfig } from '../../../config/app_config';

require('../../lib/masonry.min.js');
require('../../lib/jquery.flex-images.js');

@Component({
  selector: 'filter-image-list-root',
  templateUrl: './filter_image_list.html',
})
export class FilterImageListComponent extends ListBaseComponent implements OnInit{
	image_series: ImageSeries;
	image_list: Image[];
	all_image_format: any[];
	all_image_sort: any[];
	all_image_sort_str:any[];
	all_recommend_tag: any[];
	page_info: any;
	page: number = 1;
	search: any;
	format: any;
	sort: any;
	search_count: number;
	
	constructor(private config: AppConfig, private service: FilterImageListService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		this.isLoading = true;
        this.route.queryParams.switchMap(params => this.service.getDetail(params['search'] || '', this.page, this.format, this.sort))
		.subscribe(res => {
			this.image_series = res['image_series'];
			this.image_list = res['image_list'];
			this.page_info = res['meta'];
			this.search = res['search'];
			this.search_count = res['search_count'];
			this.all_image_format = res['all_image_format'];
			this.all_image_sort = res['all_image_sort'];
			this.all_image_sort_str = res['all_image_sort_str'];
			this.all_recommend_tag = res['recommend_tag_list'];
			this.isLoading = false;
		});
	}
	
	getPageNum(page: any): void{
		this.page = page;
		this.getPagerData();
	}
	
	selectedFormat(format: any): void {
		this.format = format;
		this.getPagerData();
	}
	
	selectedSorted(sort: any): void {
		this.sort = sort;
		this.getPagerData();
	}
	
	selectedRecommendTag(tag: any): void {
		this.router.navigate(['filter_image_list'], {queryParams: {'search': tag}});
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
			if(this.demo){
				$(this.demo.nativeElement).flexImages({rowHeight: 300, container: '.image-item' });
			}
		}
	}
}