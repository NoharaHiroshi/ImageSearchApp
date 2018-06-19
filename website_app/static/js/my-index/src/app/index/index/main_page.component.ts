declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { AppConfig } from '../../../config/app_config';

import { MainPageService } from './main_page.service';
import { ListBaseComponent } from '../../common/base.component';

import { ImageSeries } from '../../model/image_series';
import { Column } from '../../model/column';

@Component({
  selector: 'main-page-root',
  templateUrl: './main_page.html',
})
export class MainPageComponent extends ListBaseComponent implements OnInit{
	column_list: Column[];
	
	constructor(private config: AppConfig, private service: MainPageService) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
		this.service.getMainPageInfo().then(data => {
			this.column_list = data.column_list;
			setTimeout(function(){
				self.loadAfter();
			}, 100);
        });
	}
	
	// 左侧锚点
	go(name: string): void {
		if(name == 'top'){
			var top = 0;
		}else{
			var top = $('#guide-' + name).offset().top - 62;
		}
		$('html, body').animate({
			scrollTop: top
		}, 500)
	}
	
	// 获取栏目的高度
	get_elem_height(index: number): any {
		let header_fix_height = $('.header-content-fix').height();
		if($('.series-content').length){
			let h = $('.series-content').eq(index).offset().top - header_fix_height - 1; 
		}else{
			let h = 0;
		}
		return h;
	}
	
	// 设置左侧锚点是否激活
	set_current_left_nav(top_scroll: number): void {
		let last_elem_id = this.column_list.length - 1;
		for(let i=0; i<this.column_list.length; i++){
			if(top_scroll > this.get_elem_height(last_elem_id)){
				$('#left_nav_' + last_elem_id).addClass('left_current').siblings().removeClass("left_current");
			}else if(i< last_elem_id){
				let next = i + 1;
				if(top_scroll < this.get_elem_height(next) && top_scroll > this.get_elem_height(i)){
					$('#left_nav_' + i).addClass('left_current').siblings().removeClass("left_current");
					break;
				}
			}else{
				$('.left-navigation-item').removeClass("left_current");
			}
		}
	}
	
	loadAfter(): void  {
		let self = this;
		
		/* 搜索框 */
		window.onscroll = function() {
			let topScroll = $(window).scrollTop();//滚动的距离,距离顶部的距离
			self.set_current_left_nav(topScroll);
			if(topScroll > 180){  
				$(".header-content-fix").show();
			}else{
				$(".header-content-fix").hide();
			}
		}
	}
}