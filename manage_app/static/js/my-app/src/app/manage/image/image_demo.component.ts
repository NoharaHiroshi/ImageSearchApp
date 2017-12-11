declare var swal: any;
declare var $: any;

import { Component, ViewChild, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';
import { ImageTag } from '../../model/image_tag';

import { ImageService } from './image.service';

@Component({
  selector: 'image-demo',
  templateUrl: './image_demo.html'
})
export class ImageDemoConfComponent extends ListBaseComponent{
	all_image_series: ImageSeries[];
	all_image_tag: ImageTag[];
	all_image: Image[];
	
	page: number = 1;
	
	constructor(private service: ImageService) {
		super();
	}
	
	ngOnChanges(): void{
		console.log('demo.ngOnChanges');
	}
	
	// 父子组件渲染顺序：
	// demo.ngOnInit => demo.ngAfterContentInit => demo.ngAfterContentChecked => masonry.ngOnChanges => masonry.ngOnInit 
	// => masonry.ngAfterContentInit => masonry.ngAfterContentChecked => masonry.ngAfterViewInit => masonry.ngAfterViewChecked
	ngOnInit(): void {
		console.log('demo.ngOnInit');
		this.service.getImageInfo().then(data => {
        	this.all_image_series = data.image_series_list;
			this.all_image_tag = data.image_tag_list;
        });
		this.service.getImages(this.page).then(data => {
        	this.all_image = data.image_list;
        });
	}	
	
	ngAfterContentInit(): void{
		console.log('demo.ngAfterContentInit');
	}
	
	ngAfterContentChecked(): void{
		console.log('demo.ngAfterContentChecked');
	}
	
	ngAfterViewInit(): void{
		console.log('demo.AfterViewInit');
	}
	
	ngAfterViewChecked(): void{
		console.log('demo.AfterViewChecked');
	}
}