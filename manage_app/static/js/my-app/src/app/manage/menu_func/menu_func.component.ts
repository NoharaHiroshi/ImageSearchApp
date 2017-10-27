declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { MenuFunc } from '../../model/menu_func';
import { MenuFuncService } from './menu_func.service';

@Component({
  selector: 'menu-func-root',
  templateUrl: './menu_func_list.html',
})
export class MenuFuncConfComponent extends ListBaseComponent{
	menu_func_list: MenuFunc[];
	
	constructor(private service: MenuFuncService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getMenus().then(data => {
        	this.menu_func_list = data.menu_func_list;
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
  selector: 'menu-func-detail-root',
  templateUrl: './menu_func_detail.html',
})
export class MenuFuncConfDetailComponent extends ListBaseComponent{
	menu_func: MenuFunc;
	menu_select_info: any;
	func_select_info: any;
	
	constructor(private service: MenuFuncService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		this.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.menu_func = res['menu_func'];
				this.menu_select_info = res['menu_select_info'];
				this.func_select_info = res['func_select_info'];
				this.isLoading = false;
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/menu_func_conf']);
	}
	
	save(): void {
		this.service.update(this.menu_func).then(res => {
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
	
	ngDoCheck(){
		if(this.isLoading == false){
			let menu_code: string;
			let func_code: string;
			if(this.menu_func.menu_id == 0 || this.menu_func.func_id == 0){
				this.menu_func.menu_func_code = '请分别选择菜单和功能';
			}else{
				for(let menu of this.menu_select_info){
					if(menu['id'] == this.menu_func.menu_id){
						menu_code = menu['code'];
					}
				}
				for(let func of this.func_select_info){
					if(func['id'] == this.menu_func.func_id){
						func_code = func['code'];
					}
				}
				this.menu_func.menu_func_code = menu_code + '_' + func_code;
			}
		}
	}
}