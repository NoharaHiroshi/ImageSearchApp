declare var swal: any;
declare var $: any;

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';

import { ImageService } from './image.service';

import { ImageQueryComponent } from '../../common/image_list/image_list.component';

@Component({
  selector: 'image-root',
  templateUrl: './image_list.html'
})
export class ImageConfComponent extends ListBaseComponent{
	all_image_series: ImageSeries[];
	// 图片请求地址
	query_url = 'http://127.0.0.1:8888/manage/image_list?page=';
	
	del_ids: any;
	is_refresh: boolean = false;
	
	constructor(private service: ImageService) {
		super();
	}
	
	ngOnInit(): void {
		this.service.getImageInfo().then(data => {
        	this.all_image_series = data.image_series_list;
        });
	}	
	
	getDelIds(del_ids: any): void{
		this.del_ids = del_ids;
	}
	
	@ViewChild(ImageQueryComponent)
	private imageQueryComponent: ImageQueryComponent;
	
	del(): void {
		let del_ids = this.del_ids;
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
	
	AfterViewInit(): void {
		
	}
	
	refresh(): void {
		this.imageQueryComponent.refresh();
	}
	
	setCover(): void {
		let image_id = this.del_ids;
		let tpl = '';
		let self = this;
		for(let image_series of this.all_image_series){
			tpl += '<option value="' + image_series.id + '">' + image_series.name + '</option>'
		}
		swal({
			title: '设置专题封面',
			html:
				'<select id="set_cover" style="width: 60%; display: block; margin: 5px auto; height: 30px;">'
				+ tpl +
				'</select>',
			showCloseButton: true,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			confirmButtonClass: 'btn btn-theme04 margin-right10',
			cancelButtonClass: 'btn btn-theme03',
		}).then(function(isConfirm: boolean) {
			if(isConfirm === true){
				let series_id = $('#set_cover').val()
				self.service.setCover(image_id, series_id).then(data =>{
					if(data['response'] == 'ok'){
						swal('已设置');
						self.refresh();
					}else{
						swal('设置失败', data['info']);
					}
				})
			}
		});
	}
	
	addImageToSeries(): void {
		let image_id = this.del_ids;
		let tpl = '';
		let self = this;
		for(let image_series of this.all_image_series){
			tpl += '<option value="' + image_series.id + '">' + image_series.name + '</option>'
		}
		swal({
			title: '添加图片至专题',
			html:
				'<select id="add_image_to_series" style="width: 60%; display: block; margin: 5px auto; height: 30px;">'
				+ tpl +
				'</select>',
			showCloseButton: true,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			confirmButtonClass: 'btn btn-theme04 margin-right10',
			cancelButtonClass: 'btn btn-theme03',
		}).then(function(isConfirm: boolean) {
			if(isConfirm === true){
				let series_id = $('#add_image_to_series').val()
				self.service.addImageToSeries(image_id, series_id).then(data =>{
					if(data['response'] == 'ok'){
						swal('已设置');
						self.refresh();
					}else{
						swal('设置失败', data['info']);
					}
				})
			}
		});
	}
}