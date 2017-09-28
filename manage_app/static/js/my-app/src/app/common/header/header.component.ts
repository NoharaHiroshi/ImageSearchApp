import { Component, OnInit } from '@angular/core';
import { AppConfig} from '../../config/app_config';

import { Menu } from '../../model/menu';


@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	navList: Menu[];
	constructor(public app: AppConfig, private service: NavService) {}
	
	ngOnInit(): void {
		this.service.getCurUser().then(user => {
			this.app.curUser = user;
        });
		
		this.service.getNavMenus().then(res => {
			if(this.authCheck(res)){
				this.navList = res.menu_list;
        	}
        });
		
		this.service.getFilterOrgList('').then(res => {
			if(res['data_list'].length>0){
				this.app.has_org_col = true;
			};      	
        });   
	}
}