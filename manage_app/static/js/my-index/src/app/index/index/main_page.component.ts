declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { MainPageService } from './main_page.service';
import { ListBaseComponent } from '../../common/base.component';

import { Column } from '../../../../../my-app/src/app/model/column';

@Component({
  selector: 'main-page-root',
  templateUrl: './main_page.html',
})
export class MainPageComponent extends ListBaseComponent implements OnInit{
	column_list: Column[];
	
	constructor(private service: MainPageService) {
		super();
	}
	
	ngOnInit(): void {
		this.service.getMainPageInfo().then(data => {
			this.column_list = data.column_list;
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
	
	loadAfter(): void  {
		let self = this;
		let header_fix_height = $('.header-content-fix').height();
		get_elem_height = function(index) {
			var h = $('.series-content').eq(index).offset().top - header_fix_height - 1; 
			return h;
		}
		
		/* 搜索框 */
		window.onscroll = function() {
			var topScroll = $(window).scrollTop();//滚动的距离,距离顶部的距离
			if(topScroll < get_elem_height(1) && topScroll > get_elem_height(0)){
				$('#left_nav_1').addClass('left_current').siblings().removeClass("left_current");
				
			}else if(topScroll < get_elem_height(2) && topScroll > get_elem_height(1)){
				$('#left_nav_2').addClass('left_current').siblings().removeClass("left_current");
				
			}else if(topScroll < get_elem_height(3) && topScroll > get_elem_height(2)){
				$('#left_nav_3').addClass('left_current').siblings().removeClass("left_current");
				
			}else if(topScroll > get_elem_height(3)){
				$('#left_nav_4').addClass('left_current').siblings().removeClass("left_current");
			}else{
				$('.left-navigation-item').removeClass("left_current");
			}
			if(topScroll > 180){  
				$(".header-content-fix").show();
			}else{
				$(".header-content-fix").hide();
			}
		}
	}
}