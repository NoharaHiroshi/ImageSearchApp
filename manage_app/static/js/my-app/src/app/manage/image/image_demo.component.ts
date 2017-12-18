declare var swal: any;
declare var $: any;

import { Component, ViewChild, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';
import { ImageSeries } from '../../model/image_series';
import { ImageTag } from '../../model/image_tag';

import { ImageService } from './image.service';
import { MasonryComponent } from '../../common/masonry/masonry.component';

@Component({
  selector: 'image-demo',
  templateUrl: './image_demo.html'
})
export class ImageDemoConfComponent extends ListBaseComponent{
	all_image_series: ImageSeries[];
	all_image_tag: ImageTag[];
	all_image: Image[];
	
	page: number = 1;
	
	queryParams = {
		startDate: '',
		endDate: '',
		name: ''
	};
	
	del_ids: any;
	
	constructor(private service: ImageService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getImageInfo().then(data => {
        	this.all_image_series = data.image_series_list;
			this.all_image_tag = data.image_tag_list;
        });
		this.service.getImages(this.page, this.queryParams).then(data => {
        	this.all_image = data.image_list;
			this.isLoading = false;
        });
	}
	
	getDelIds(del_ids: any): void{
		this.del_ids = del_ids;
	}
	
	@ViewChild(MasonryComponent)
	private masonryComponent: MasonryComponent;
	
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
	
	queryImages(): void {
		this.service.getImages(this.page, this.queryParams).then(data => {
        	this.all_image = data.image_list;
        });
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
	
	addImageToTag(): void {
		let image_id = this.del_ids;
		let tpl = '';
		let self = this;
		for(let image_tag of this.all_image_tag){
			tpl += '<option value="' + image_tag.id + '">' + image_tag.name + '</option>'
		}
		swal({
			title: '添加图片至标签',
			html:
				'<select id="add_image_to_tag" style="width: 60%; display: block; margin: 5px auto; height: 30px;">'
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
				let tag_id = $('#add_image_to_tag').val()
				self.service.addImageToTag(image_id, tag_id).then(data =>{
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