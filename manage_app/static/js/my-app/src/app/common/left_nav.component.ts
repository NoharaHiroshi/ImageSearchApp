import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service';

import { AppConfig} from '../config/app_config';
import { Menu } from '../model/manage/permission/menu';

@Component({
  selector: 'left-nav-root',
  templateUrl: '../../tpl/blocks/aside.html',
})

export class LeftNavComponent implements OnInit {
	menu_list:any[];
		
	constructor(public app: AppConfig, private service: NavService) {
	}
	
	ngOnInit(): void {
		this.service.getMenus().then(data => {
        	this.menu_list = data.menu_list;
        });
	}
	
	
}