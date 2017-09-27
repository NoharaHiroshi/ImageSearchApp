import { Component, OnInit } from '@angular/core';
import { AppConfig} from '../config/app_config';

import { User} from '../model/manage/permission/user';
import { Menu } from '../model/manage/permission/menu';
import { NavService } from './nav.service';
import { BaseComponent } from './base.component';

@Component({
  selector: 'header-root',
  templateUrl: '../../tpl/blocks/header.html',
})

export class HeaderComponent  extends BaseComponent implements OnInit {
	navList:Menu[];
	constructor(public app: AppConfig, private service: NavService) {
		super();
	}
	
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