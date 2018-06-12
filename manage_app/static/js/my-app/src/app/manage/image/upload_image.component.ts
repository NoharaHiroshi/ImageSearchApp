import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

@Component({
  selector: 'upload-image',
  templateUrl: './upload_image.html',
})
export class ImageUploadComponent extends ListBaseComponent{
	series_id_list: string;
	tag_id_list: string;
	
	public uploader: FileUploader = new FileUploader({
		url: "http://127.0.0.1:8888/manage/upload_image",
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
	
	getPagerData(): void {
		let self = this;
        setTimeout(function(){
			self.loadAfter();
		}, 200);
	}
	
	genUrl(): void {
		this.uploader.options.url = this.uploader.options.url + '?series_ids=' + this.series_id_list + '&tag_ids=' + this.tag_id_list;
		console.log('current upload url: ' + this.uploader.options.url);
	}
	
	loadAfter(): void  {
		let self = this;
		const series_url = `/lib/get_all_series`; 
		$('#series_select').select2({
            placeholder: '请选择专题',
            allowClear: true,
			multiple: true,
            ajax: {
                url: series_url,
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
                    var more = (page * 10) < data.meta.count;
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
        	self.series_id_list = $('#series_select').val();
        });
		
		const tag_url = `/lib/get_all_tags`;  
		$('#tag_select').select2({
            placeholder: '请选择标签',
            allowClear: true,
			multiple: true,
            ajax: {
                url: tag_url,
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
                    var more = (page * 10) < data.meta.count;
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
        	self.tag_id_list = $('#tag_select').val();
        });
	}
}