import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { ListBaseComponent } from '../base.component';

import { Banner } from '../../model/banner';
import { WebsiteMenu } from '../../model/website_menu';
import { HotSearch } from '../../model/hot_search';

declare var $: any;

@Component({
  selector: 'website-header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	banner_list: any[];
	website_menu_list: any[];
	hot_search_list: any[];
	
	constructor(private service: HeaderService, public route: ActivatedRoute, public router: Router) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.banner_list = data.banner_list;
			this.website_menu_list = data.website_menu_list;
			this.hot_search_list = data.hot_search_list;
        });
	}
}