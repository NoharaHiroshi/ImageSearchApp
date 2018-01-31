declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ImageSeriesListService } from './image_series_list.service';
import { ListBaseComponent } from '../../common/base.component';

import { ImageSeries } from '../../model/image_series';
import { ImageSeriesCategory } from '../../model/image_series_category';

require('../../lib/masonry.min.js');

@Component({
  selector: 'image-series-list-root',
  templateUrl: './image_series_list.html',
})
export class ImageSeriesListComponent extends ListBaseComponent implements OnInit{
	series_category: ImageSeriesCategory;
	series_list: ImageSeries[];
	page_info: any;
	page: number = 1;
	
	constructor(private service: ImageSeriesListService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0', this.page))
	        .subscribe(res => {
				this.series_category = res['series_category'];
	        	this.series_list = res['series_list'];
				this.page_info = res['meta'];
				this.isLoading = false;
	        });
	}
	
	getPageNum(page: any): void{
		this.page = page;
		this.getPagerData();
	}
	
	@ViewChild('demo')
	demo: ElementRef;
	
	/* ngAfterViewInit(): void{
		let self = this;
		var $container = $('#demo');
		if(this.series_list){
			$container.masonry({  
				itemSelector: '.sitem',  
				gutter: 20,  
				isAnimated: true,  
			});  
		}
	} */
}