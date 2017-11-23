declare var swal: any;
declare var $: any;

import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { Image } from '../../model/image';
import { ImageService } from './image.service';

@Component({
  selector: 'image-root',
  templateUrl: './image_list.html'
})
export class ImageConfComponent extends ListBaseComponent{
	image_list: Image[];
	del_ids: any;
	is_refresh: boolean = false;
	
	constructor(private service: ImageService) {
		super();
	}
	
	getDelIds(del_ids: any): void{
		this.del_ids = del_ids;
	}
	
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
}