declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ImageSeriesListService } from './image_series_list.service';
import { ListBaseComponent } from '../../common/base.component';

import { ImageSeries } from '../../../../../my-app/src/app/model/image_series';
import { ImageSeriesCategory } from '../../../../../my-app/src/app/model/image_series_category';

require('../../lib/jquery.flex-images.js');

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
		let _height = 280;
		let demo_width = $('#demo').width(),
			series_divs = $('.series-item');
		if(this.series_list){
			if(this.series_list.length == series_divs.length){
				for(let i=0; i<series_divs.length; i++){
					let series_div = series_divs[i],
						series_obj = this.series_list[i],
						_w = _height / series_obj.height * series_obj.width,
						_h = _height;
					$(series_div).attr('data-w', _w);
					$(series_div).attr('data-h', _h);
				}
			}
			$(this.demo.nativeElement).flexImages({rowHeight: 300, container: '.series-item' });
		}
	}
}