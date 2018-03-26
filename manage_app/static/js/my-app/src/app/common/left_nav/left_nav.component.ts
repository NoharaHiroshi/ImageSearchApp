import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router, Event, NavigationEnd } from '@angular/router';
import { LeftNavService } from './left_nav.service';

import { Menu } from '../../model/menu';
import { AppConfig } from '../../config/app_config';

require('./jquery.dcjqaccordion.2.7.js');

declare var $: any;

@Component({
  selector: 'left-nav-root',
  templateUrl: './left_nav.html',
})
export class LeftNavComponent implements OnInit {
	menu_list: Menu[];
	menu_title: string;
	
	module: string;
	
	constructor(private service: LeftNavService, public router: Router, public location: Location, public config: AppConfig) {}
	
	getLeftNav(): void {
		this.module = this.location.path().split('/')[1];
		console.log('从路由中获得的module: ' + this.module);
		if(this.module != this.config.module){
			console.log('当前模块: ' + this.module);
			this.service.getMenus(this.module).then(data => {
				this.menu_list = data.menu_list;
				this.menu_title = data.menu_title;
			});
			this.config.module = this.module;
		} 
	}
	
	// 激活左边导航栏样式
	activateLeftNav(): void {
		setTimeout(function(){
			$('.nav-accordion').dcAccordion({
				eventType: 'click',
				autoClose: true,
				saveState: true,
				disableLink: true,
				speed: 'slow',
				showCount: false,
				autoExpand: true,
				classExpand: 'dcjq-current-parent'
			});
		}, 500);
	}
	
	ngOnInit(): void {
		let self = this;
		this.router.events
			.subscribe((event: Event) => {
				if (event instanceof NavigationEnd) {
					self.getLeftNav();
					self.activateLeftNav(); 
				}
			});
	}
	
}