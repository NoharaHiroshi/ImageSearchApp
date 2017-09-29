import { Component, OnInit } from '@angular/core';
import { LeftNavService } from './left_nav.service';

import { AppConfig} from '../../config/app_config';
import { Menu } from '../../model/menu';

@Component({
  selector: 'left-nav-root',
  templateUrl: './left_nav.html',
})
export class LeftNavComponent implements OnInit {
	menu_list: Menu[];
		
	constructor(public app: AppConfig, private service: LeftNavService) {}
	
	ngOnInit(): void {
		this.service.getMenus().then(data => {
        	this.menu_list = data.menu_list;
        });
	}
	
	
}