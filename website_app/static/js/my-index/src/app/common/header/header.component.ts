import { Component, OnInit, AfterContentChecked, AfterViewInit } from '@angular/core';

import { HeaderService } from './header.service';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { ListBaseComponent } from '../base.component';

import { Banner } from '../../model/banner';
import { WebsiteMenu } from '../../model/website_menu';
import { HotSearch } from '../../model/hot_search';
import { Customer } from '../../model/customer';

import { AppConfig } from '../../../config/app_config';

declare var $: any;

@Component({
  selector: 'website-header-root',
  templateUrl: './header.html',
})

export class HeaderComponent extends ListBaseComponent implements OnInit {
	banner_list: any[];
	website_menu_list: any[];
	hot_search_list: any[];
	recommend_list: any[];
	search: any;
	customer: Customer;
	bread_nav_list: any[];
	
	constructor(private service: HeaderService, public config: AppConfig, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
		this.service.getInfo().then(data => {
        	this.banner_list = data.banner_list;
			this.website_menu_list = data.website_menu_list;
			this.hot_search_list = data.hot_search_list;
			this.recommend_list = data.recommend_list;
			if(JSON.stringify(data.customer) != "{}"){
				this.customer = data.customer;
				this.config.user = data.customer;
			}
        });
		this.route.params.switchMap((params: Params) => this.service.getBreadNav(this.current_url))
		.subscribe(res => {
			this.bread_nav_list = res['bread_nav'];
		});
		setTimeout(function(){
			self.loadAfter();
		}, 300);
	}
	
	logout(): void {
		this.service.logout().then(data => {
			if(data['response'] == "ok"){
				window.location.reload();
			}
		});
	}
	
	login(): void {
		this.config.isLoginOpen = true;
	}
	
	returnLogin(isLogin: any): void {
		this.config.isLoginOpen = isLogin;
	}
	
	searchImage(): void {
		if(this.search){
			this.router.navigate(['filter_image_list'], {queryParams: {'search': this.search}});
		}else{
			console.log('请输入搜索内容');
		}
	}
	
	enterSearchImage(event: any): void {
		this.searchImage();
	}
	
	loadAfter(): void {
		/* 搜索框 */
		$("#main-search").click(function(e){
			$('#recommond').show();
			e.stopPropagation();
		});
		
		$(document).on("click", function(e){
			$('#recommond').hide();
		});
		
		$("#main-search-fix").focus(function(){
			$('#recommond-fix').show();
		});
		$("#main-search-fix").blur(function(){
			$('#recommond-fix').hide();
		});
	}
}