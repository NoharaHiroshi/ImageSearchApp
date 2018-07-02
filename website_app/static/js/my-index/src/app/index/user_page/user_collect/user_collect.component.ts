declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { ListBaseComponent } from '../../../common/base.component';

import { Customer } from '../../../model/customer';
import { Image } from '../../../model/image';

import { AppConfig } from '../../../../config/app_config';
import { UserCollectService } from './user_collect.service';

require('../../../lib/masonry.min.js');
require('../../../lib/jquery.flex-images.js');


@Component({
  selector: 'user-collect-root',
  templateUrl: './user_collect.html',
})
export class UserCollectComponent extends ListBaseComponent implements OnInit{
	image_list: Image[];
	page: number = 1;
	page_info: any;
	
	constructor(public config: AppConfig, public service: UserCollectService) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
		this.config.isLoading = true
		this.service.getDetail().then(res => {
			if(this.config.authCheck(res)){
				this.image_list = res['image_list'];
				this.page_info = res['meta'];
				this.config.isLoading = false;
			}
		});
	}
	
	getPageNum(page: any): void{
		this.page = page;
		this.getPagerData();
	}
	
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
		}else{
			console.log('not image_list');
		}
	}
}