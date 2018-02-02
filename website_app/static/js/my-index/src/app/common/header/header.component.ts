import { Component, OnInit } from '@angular/core';

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

export class HeaderComponent implements OnInit {
	banner_list: any[];
	website_menu_list: any[];
	hot_search_list: any[];
	customer: Customer;
	
	constructor(private service: HeaderService, public config: AppConfig, public route: ActivatedRoute, public router: Router) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.banner_list = data.banner_list;
			this.website_menu_list = data.website_menu_list;
			this.hot_search_list = data.hot_search_list;
			this.customer = data.customer;
        });
	}
}