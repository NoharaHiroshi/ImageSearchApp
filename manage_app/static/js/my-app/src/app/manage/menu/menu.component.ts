declare var $: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { ListBaseComponent } from '../../common/base.component';
import { Menu } from '../../model/menu';
import { MenuService } from './menu.service';

@Component({
  selector: 'menu-root',
  templateUrl: './menu_list.html',
})
export class MenuConfComponent extends ListBaseComponent{
	menu_list: Menu[];
	ztree_menu_list: any[];
	
	constructor(private service: MenuService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getMenus().then(data => {
        	this.menu_list = data.menu_list;
			this.ztree_menu_list = [];
			for(let menu of this.menu_list){
				let _sub_menus = []; 
				
				for(let sub_menu of menu.sub_menus){
					_sub_menus.push(
						{ name: sub_menu.name }
					)
				}
				
				let _menu = {
					name: menu.name,
					open: true,
					children: _sub_menus
				}
				this.ztree_menu_list.push(_menu);
			}
			this.isLoading = false;
        });
	}
}

@Component({
  selector: 'menu-detail-root',
  templateUrl: './menu_detail.html',
})
export class MenuConfDetailComponent{
	
}