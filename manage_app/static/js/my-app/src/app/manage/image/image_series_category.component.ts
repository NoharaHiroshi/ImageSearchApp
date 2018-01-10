declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { ImageSeriesCategoryService } from './image_series_category.service';
import { ImageSeriesCategory } from '../../model/image_series_category';
import { Image } from '../../model/image';

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
		this.router.navigate(['/image_series_category_conf']);
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