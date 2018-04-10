declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

import { ListBaseComponent } from '../../common/base.component';
import { Discount } from '../../model/discount';
import { DiscountService } from './discount.service';


@Component({
  selector: 'discount-root',
  templateUrl: './discount_list.html',
})
export class DiscountConfComponent extends ListBaseComponent{
	discount_list: Discount[];
	
	constructor(private service: DiscountService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getDiscount().then(data => {
        	this.discount_list = data.discount_list;
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
  selector: 'discount-detail-root',
  templateUrl: './discount_detail.html',
})
export class DiscountConfDetailComponent extends ListBaseComponent{
	discount: Discount;
	discount_img: any;
	
	constructor(private service: DiscountService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	public uploader: FileUploader = new FileUploader({
		url: "http://127.0.0.1:8888/website/discount/upload",
		itemAlias: "uploadedfile"
	});
	public hasBaseDropZoneOver:boolean = false;
	public hasAnotherDropZoneOver:boolean = false;

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	public fileOverAnother(e:any):void {
		this.hasAnotherDropZoneOver = e;
	}
	
	selectedFileOnChanged() {
		// 这里是文件选择完成后的操作处理
		let reader = new FileReader();
		let self = this;
		reader.readAsDataURL(this.uploader.queue[0].some);
		reader.onload = function(e){
			self.discount_img = this.result;
		}
		this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any) => {
			// 上传成功
			let res = JSON.parse(response);
			if(res.response == 'ok'){
				self.discount.img_id = res.img_id_list[0];
				console.log(res.img_id_list[0]);
			}else{
				swal('图片选择失败');
			}
		}
	}	
	
	clearAllImg(): void {
		this.uploader.clearQueue();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.discount = res['discount'];
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		this.service.update(this.discount).then(res => {
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