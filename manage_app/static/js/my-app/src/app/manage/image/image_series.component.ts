declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { ImageSeriesService } from './image_series.service'
import { ImageSeries } from '../../model/image_series';

@Component({
  selector: 'image-series-root',
  templateUrl: './image_series_list.html',
})
export class ImageSeriesConfComponent extends ListBaseComponent{
	image_seriess_list: ImageSeries[];
	
	constructor(private service: ImageSeriesService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getImageSeries().then(data => {
        	this.image_series_list = data.image_series_list;
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
  selector: 'image-series-detail-root',
  templateUrl: './image_series_detail.html',
})
export class ImageSeriesConfDetailComponent extends ListBaseComponent{
	imageSeries: ImageSeries;
	
	constructor(private service: ImageSeriesService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.imageSeries = res['image_series'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/image_series_conf']);
	}
	
	save(): void {
		this.service.update(this.imageSeries).then(res => {
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