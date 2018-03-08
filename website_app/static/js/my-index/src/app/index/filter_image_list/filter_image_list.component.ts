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
	
	
	@ViewChild('demo')
	demo: ElementRef;
	
	ngAfterViewInit(): void{
		let self = this;
		var $container = $('#demo');
		if(this.image_list){
			$container.masonry({  
				itemSelector: '.sitem',  
				gutter: 20,  
				isAnimated: true,  
				fitWidth: true
			});  
		}
	}
}