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
	search: any;
	customer: Customer;
	
	constructor(private service: HeaderService, public config: AppConfig, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.banner_list = data.banner_list;
			this.website_menu_list = data.website_menu_list;
			this.hot_search_list = data.hot_search_list;
			if(JSON.stringify(data.customer) != "{}"){
				this.customer = data.customer;
			}
        });
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
}