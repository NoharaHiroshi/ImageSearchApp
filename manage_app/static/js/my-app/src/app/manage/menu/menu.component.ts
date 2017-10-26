declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

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
					_sub_menus.push({ 
						name: sub_menu.name,
						menu_id: sub_menu.id,
					})
				}
				
				let _menu = {
					name: menu.name,
					menu_id: menu.id,
					open: true,
					children: _sub_menus
				}
				this.ztree_menu_list.push(_menu);
			}
			this.isLoading = false;
        });
	}
	
	del(): void {
		let del_ids = this.selectChecked();
		let self = this;
		swal({
			title: '删除',
			text: '确定删除当前数据？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '删除',
			cancelButtonText: '取消',
			confirmButtonClass: 'btn btn-theme04 margin-right10',
			cancelButtonClass: 'btn btn-theme03',
			buttonsStyling: false
		}).then(function(isConfirm: boolean) {
			if(isConfirm === true){
				self.service.del(del_ids).then(data =>{
					if(data['response'] == 'ok'){
						swal('已删除');
						self.refresh();
					}else{
						swal('删除失败', data['info']);
						self.refresh();
					}
				})
			}else if (isConfirm === false){
				self.refresh();
			}else{
				self.refresh();
			}
		});
	}
}

@Component({
  selector: 'menu-detail-root',
  templateUrl: './menu_detail.html',
})
export class MenuConfDetailComponent extends ListBaseComponent{
	menu: Menu;
	menu_select_info: any;
	
	constructor(private service: MenuService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.menu = res['menu'];
				this.menu_select_info = res['menu_select_info'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/menu_conf']);
	}
	
	save(): void {
		this.service.update(this.menu).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', '保存失败');
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
				this.goBack();
			}
		});
	}
}