declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

import { ListBaseComponent } from '../../common/base.component';
import { Banner } from '../../model/banner';
import { BannerService } from './banner.service';


@Component({
  selector: 'banner-root',
  templateUrl: './banner_list.html',
})
export class BannerConfComponent extends ListBaseComponent{
	banner_list: Banner[];
	
	constructor(private service: BannerService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getBanner().then(data => {
        	this.banner_list = data.banner_list;
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
  selector: 'banner-detail-root',
  templateUrl: './banner_detail.html',
})
export class BannerConfDetailComponent extends ListBaseComponent{
	banner: Banner;
	all_series_list: any;
	banner_img: any;
	
	constructor(private service: BannerService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	public uploader: FileUploader = new FileUploader({
		url: "http://127.0.0.1:8888/website/banner/upload",
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
			self.banner_img = this.result;
		}
		this.uploader.uploadAll();
		this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
			// 上传成功
			let res = JSON.parse(response);
			if(res.response == 'ok'){
				self.banner.img_id = res.img_id_list[0];
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
	        	this.banner = res['banner'];
				setTimeout(function(){
					self.loadAfter();
				}, 200);
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/banner_conf']);
	}
	
	save(): void {
		this.service.update(this.banner).then(res => {
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
	
	loadAfter(): void  {
		let self = this;
		let data_name: string;
		const url = `/lib/get_all_series`; 
		$('#series_select').val(self.banner.connect_id).select2({
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
					_series_id = self.banner.connect_id,
					_series_name = self.banner.connect_name;
                if(undefined !== _series_id){
                    data = ({id: _series_id, name: _series_name});
                }
				callback(data);
            },
            formatSelection: function(data:any){
				data_name = data.name;
                return data.name;
            },
            formatResult: function(data:any){
            	var s = "<div style='padding: 5px;'>" + data.name + "</div>";
                return  s;
            }
        }).on('change', function(){
        	self.banner.connect_id = $('#series_select').val()
			self.banner.connect_name = data_name;
        });
	}
}