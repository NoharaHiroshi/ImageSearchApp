declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

import { ListBaseComponent } from '../../common/base.component';
import { Column } from '../../model/column';
import { ColumnSeries } from '../../model/column_series';

import { ColumnService } from './column.service';


@Component({
  selector: 'column-root',
  templateUrl: './column_list.html',
})
export class ColumnConfComponent extends ListBaseComponent{
	column_list: Column[];
	
	constructor(private service: ColumnService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getColumn().then(data => {
        	this.column_list = data.column_list;
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
  selector: 'column-detail-root',
  templateUrl: './column_detail.html',
})
export class ColumnConfDetailComponent extends ListBaseComponent{
	column: Column;
	
	constructor(private service: ColumnService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.column = res['column'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/column_conf']);
	}
	
	save(): void {
		this.service.update(this.column).then(res => {
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

@Component({
  selector: 'column-set-detail-root',
  templateUrl: './column_set_detail.html',
})
export class ColumnConfSetDetailComponent extends ListBaseComponent{
	column: Column;
	column_series_rel_list: ColumnSeries[];
	series_id_list: any[];
	
	constructor(private service: ColumnService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getSetDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.column = res['column'];
				this.column_series_rel_list = res['column_series_rel_list'];
				this.isLoading = false;
				setTimeout(function(){
					self.loadAfter();
				}, 200);
	        });
	}
	
	save(): void {
		this.service.set(this.column.id, this.series_id_list).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', '保存失败');
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
				this.refresh();
			}
		});
	}
	
	goBack(): void {
		this.router.navigate(['/column_conf']);
	}
	
	loadAfter(): void  {
		let self = this;
		const url = `/lib/get_all_series`; 
		$('#series_select').select2({
            placeholder: '请选择专题',
            allowClear: true,
			multiple: true,
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
			formatSelection: function(data:any){
                return data.name;
            },
            formatResult: function(data:any){
            	var s = "<div style='padding: 5px;'>" + data.name + "</div>";
                return  s;
            }
        }).on('change', function(){
        	self.series_id_list = $('#series_select').val()
        });
	}
	
}