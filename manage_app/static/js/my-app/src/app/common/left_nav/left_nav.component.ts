import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { LeftNavService } from './left_nav.service';

import { Menu } from '../../model/menu';

require('./jquery.dcjqaccordion.2.7.js');

declare var $: any;

@Component({
  selector: 'left-nav-root',
  templateUrl: './left_nav.html',
})
export class LeftNavComponent implements OnInit {
	menu_list: Menu[];
	menu_title: string;
	
	private _module: any;
	@Input() 
	set module(module: any) {
		if(!module){
			this._module = 'manage';
		}else{
			this._module = module;
		}
	}
	get module() {
		return this._module;
	}
	
	constructor(private service: LeftNavService) {}
	
	getLeftNav(): void {
		this.service.getMenus(this.module).then(data => {
        	this.menu_list = data.menu_list;
			this.menu_title = data.menu_title;
			this.activateLeftNav();
        });
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
		}, 100);
	}
	
	ngOnInit(): void {
		this.getLeftNav();
	}
	
	ngOnChanges(): void {
		this.getLeftNav();
	}
}