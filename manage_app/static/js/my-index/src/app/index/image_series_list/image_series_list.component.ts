declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ImageSeriesListService } from './image_series_list.service';
import { ListBaseComponent } from '../../common/base.component';

import { ImageSeries } from '../../../../../my-app/src/app/model/image_series';
import { ImageSeriesCategory } from '../../../../../my-app/src/app/model/image_series_category';

require('../../lib/masonry.min.js');

@Component({
  selector: 'image-series-list-root',
  templateUrl: './image_series_list.html',
})
export class ImageSeriesListComponent extends ListBaseComponent implements OnInit{
	series_category: ImageSeriesCategory;
	series_list: ImageSeries[];
	
	constructor(private service: ImageSeriesListService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
				this.series_category = res['series_category'];
	        	this.series_list = res['series_list'];
	        });
	}
	
	@ViewChild('demo')
	demo: ElementRef;
	
	ngAfterViewChecked(): void{
		let self = this;
		var $container = $('#demo');
		if(this.series_list){
			$container.masonry({  
				itemSelector: '.sitem',  
				gutter: 20,  
				isAnimated: true,  
			});  
		}
	}
}