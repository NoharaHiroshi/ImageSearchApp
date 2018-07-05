declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { ImageTagService } from './image_tag.service'
import { ImageTag } from '../../model/image_tag';
import { Image } from '../../model/image';

import { ImageService } from './image.service'
import { ImageQueryComponent } from '../../common/image_list/image_list.component';

@Component({
  selector: 'image-tag-root',
  templateUrl: './image_tag_list.html',
})
export class ImageTagConfComponent extends ListBaseComponent{
	image_tag_list: ImageTag[];
	page_info: any;
	
	page: number = 1;
	
	constructor(private service: ImageTagService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getImageTag(this.page).then(data => {
        	this.image_tag_list = data.image_tag_list;
			this.page_info = data.meta;
			this.isLoading = false;
        });
	}
	
	getPageNum(page: any): void{
		this.page = page;
		this.getPagerData();
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
  selector: 'image-tag-detail-root',
  templateUrl: './image_tag_detail.html',
})
export class ImageTagConfDetailComponent extends ListBaseComponent{
	imageTag: ImageTag;
	
	constructor(private service: ImageTagService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.imageTag = res['image_tag'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		this.service.update(this.imageTag).then(res => {
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
  selector: 'image-tag-set-root',
  templateUrl: './image_tag_set.html',
})
export class ImageTagSetComponent extends ListBaseComponent{
	all_image_tag: ImageTag[];
	all_image: Image[];
	page: number = 1;
	
	del_ids: any;
	
	constructor(private service: ImageTagService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.route.params.switchMap((params: Params) => this.service.getImages(this.page, params['id'])).subscribe(data => {
			this.all_image = data.image_list;
			this.isLoading = false;
		});
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	getDelIds(del_ids: any): void{
		this.del_ids = del_ids;
	}
	
	@ViewChild(ImageQueryComponent)
	private imageQueryComponent: ImageQueryComponent;
	
	removeImageFromTag(): void {
		let series_id = this.route.params._value.id;
		let del_ids = this.del_ids;
		let self = this;
		swal({
			title: '删除',
			text: '确定将当前图片移除标签？',
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
				self.service.removeImageFromTag(del_ids, series_id).then(data =>{
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
  selector: 'image-association-tag-set-root',
  templateUrl: './image_association_tag_set.html',
})
export class ImageAssociationTagSetComponent extends ListBaseComponent{
	association_tag_str: string;
	tag_id: string;
	
	constructor(private service: ImageTagService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
		this.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getAssociationTagDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.association_tag_str = res['association_tag_str'];
				this.tag_id = res['tag_id'];
				this.isLoading = false;
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		this.service.updateAssociationTag(this.association_tag_str, this.tag_id).then(res => {
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