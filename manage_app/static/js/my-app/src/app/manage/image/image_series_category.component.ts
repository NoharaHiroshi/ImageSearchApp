declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { ImageSeriesCategoryService } from './image_series_category.service';
import { ImageSeriesCategory } from '../../model/image_series_category';
import { ImageSeriesCategoryRel } from '../../model/image_series_category_rel';

require("../lib/select2.js");

@Component({
  selector: 'image-series-category-root',
  templateUrl: './image_series_category_list.html',
})
export class ImageSeriesCategoryConfComponent extends ListBaseComponent{
	image_series_category_list: ImageSeriesCategory[];
	
	constructor(private service: ImageSeriesCategoryService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getImageSeriesCategory().then(data => {
        	this.image_series_category_list = data.image_series_category_list;
			this.isLoading = false;
        });
	}
	
	del(): void {
		let del_ids = this.selectChecked();
		let self = this;
		swal({
			title: '删除',
			text: '确定删除当前专题？',
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
  selector: 'image-series-category-detail-root',
  templateUrl: './image_series_category_detail.html',
})
export class ImageSeriesCategoryConfDetailComponent extends ListBaseComponent{
	imageSeriesCategory: ImageSeriesCategory;
	
	constructor(private service: ImageSeriesCategoryService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.imageSeriesCategory = res['image_series_category'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		this.service.update(this.imageSeriesCategory).then(res => {
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
  selector: 'image-series-category-set-detail-root',
  templateUrl: './image_series_category_set_detail.html',
})
export class ImageSeriesCategoryConfSetDetailComponent extends ListBaseComponent{
	image_series_category: ImageSeriesCategory;
	image_series_category_rel_list: ImageSeriesCategoryRel[];
	series_id_list: string;
	
	constructor(private service: ImageSeriesCategoryService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	getPagerData(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getSetDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.image_series_category = res['image_series_category'];
				this.image_series_category_rel_list = res['image_series_category_rel_list'];
				this.isLoading = false;
				setTimeout(function(){
					self.loadAfter();
				}, 200);
	        });
	}
	
	save(): void {
		this.service.set(this.image_series_category.id, this.series_id_list).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', '保存失败');
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
				location.reload();
			}
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
				self.service.set_del(del_ids).then(data =>{
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
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	loadAfter(): void  {
		let self = this;
		const url = `/lib/get_column_all_series`; 
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
						image_series_category_id: self.image_series_category.id
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