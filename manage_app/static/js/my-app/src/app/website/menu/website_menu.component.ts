declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { WebsiteMenu } from '../../model/website_menu';
import { WebsiteMenuService } from './website_menu.service';

require("../lib/select2.js");

@Component({
  selector: 'website-menu-root',
  templateUrl: './website_menu_list.html',
})
export class WebsiteMenuConfComponent extends ListBaseComponent{
	menu_list: WebsiteMenu[];
	
	constructor(private service: WebsiteMenuService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getMenus().then(data => {
        	this.menu_list = data.menu_list;
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
	
	changeUpSort(menu_id: String): void {
		this.service.changeSort(menu_id, 'up').then(data =>{
			if(data['response'] == 'ok'){
				swal('移动成功');
				this.refresh();
			}else{
				swal('移动失败', data['info']);
				this.refresh();
			}
		})
	}
	
	changeDownSort(menu_id: String): void {
		this.service.changeSort(menu_id, 'down').then(data =>{
			if(data['response'] == 'ok'){
				swal('移动成功');
				this.refresh();
			}else{
				swal('移动失败', data['info']);
				this.refresh();
			}
		})
	}
}

@Component({
  selector: 'website-menu-detail-root',
  templateUrl: './website_menu_detail.html',
})
export class WebsiteMenuConfDetailComponent extends ListBaseComponent{
	menu: WebsiteMenu;
	menu_select_info: any;
	all_series_list: any;
	
	constructor(private service: WebsiteMenuService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.menu = res['menu'];
				this.menu_select_info = res['menu_select_info'];
				this.all_series_list = res['all_series_list'];
				setTimeout(function(){
					self.loadAfter();
				}, 200);
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/website_menu_conf']);
	}
	
	save(): void {
		this.service.update(this.menu).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', res.info);
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
				this.goBack();
			}
		});
	}
	
	loadAfter(): void  {
		let self = this;
		let data_name: string;
		const url = `/lib/get_all_series`; 
		$('#series_select').val(self.menu.connect_id).select2({
            placeholder: '请选择专题',
            allowClear: true,
            ajax: {
                url: url,
                dataType: 'json',
                quietMillis: 100,
                data: function (search:any, page:any) {
                    return {
                    	search: search,
                        limit: 10,
                        page: page,
                    };
                },
                results: function (data:any, page:any) {
                    var more = (page * 10) < data.meta.total;
                    return {results: data['data_list'], more: more};
                }
            },
            initSelection: function(element:any, callback:any){
            	var data = {}, 
					_series_id = self.menu.connect_id,
					_series_name = self.menu.connect_name;
                if(undefined !== _series_id){
                    data = ({id: _series_id, name: _series_name});
                }
				callback(data);
            },
			// 用于渲染当前选择
            formatSelection: function(data:any){
				data_name = data.name;
                return data.name;
            },
			// 用于渲染结果
            formatResult: function(data:any){
            	var s = "<div style='padding: 5px;'>" + data.name + "</div>";
                return s;
            }
        }).on('change', function(){
        	self.menu.connect_id = $('#series_select').val()
			self.menu.connect_name = data_name;
        });
	}
}