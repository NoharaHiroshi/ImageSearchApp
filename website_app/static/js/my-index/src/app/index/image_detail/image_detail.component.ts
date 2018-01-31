declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ImageDetailService } from './image_detail.service';
import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';
import { ImageSeriesCategory } from '../../model/image_series_category';

@Component({
  selector: 'image-detail-root',
  templateUrl: './image_detail.html',
})
export class ImageDetailComponent extends ListBaseComponent implements OnInit{
	image: Image;
	image_url: String;
	
	constructor(private service: ImageDetailService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
				this.image = res['image'];
				this.isLoading = false;
	        });
	}
	
	downloadSourceImage(image_id: String): void {
		this.service.getSourceImage(params['id']).subscribe(res => {
			this.image_url = res['img_full_url'];
		})
	}

}