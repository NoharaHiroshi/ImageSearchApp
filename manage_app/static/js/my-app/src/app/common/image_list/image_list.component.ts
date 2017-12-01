import { Component, Input, Output, EventEmitter } from '@angular/core';

require('./waterfall.js');

declare var swal: any;
declare var $: any;

@Component({
    selector: 'image-list',
	templateUrl: './image_list.html',
})
export class ImageQueryComponent {
	@Input() queryUrl: any;
	@Output() delIds = new EventEmitter<any>();  
	
	constructor() {};
	
	selectIds(): void {
		let obj_list = [];
		let objs = $('.image-selected');
		for(let obj of objs){
			obj_list.push(obj.id);
		}
		let del_ids = obj_list.join(',');
		this.delIds.emit(del_ids);
	}
	
	getImageList(): void {
		let self = this;
		// 流体式布局
		$("#demo").waterfall({
			itemCls: "witem",
			colWidth: 255,
			gutterWidth: 15,
			gutterHeight: 15,
			dataType: 'json', 
			checkImagesLoaded: false,
			callbacks: {
				loadingFinished: function($loading: any, isBeyondMaxPage: any) {
                    if ( !isBeyondMaxPage ) {} else {
						$("#demo").waterfall('pause', function() {
							$('#demo-info').html('<p style="color:#666;">没有更多内容...</p>')
						});
                    }
                },
				renderData: function (data: any, dataType: any) {
					if (dataType === 'json'){
						var max_page = data.meta.all_page,
							cur_page = data.meta.cur_page;
							
						$("#demo").waterfall('option', {
							maxPage: max_page
						}, function() {})
						
						var str = "";
						// colWidth = gutterWidth * 2 + width
						var templ = `<div class="witem" id="image_id">
										<img src="/static/[src]" width="225"/>
										<div style="position: relative; margin-top: 10px;">
											['series_name']
										</div>
										<div style="position: relative; margin-top: 10px;">
											['tag_name']
										</div>
									</div>`

						for(var i = 0; i < data.image_list.length; i++) {
							let _str = '';
							_str = templ.replace("[src]", data.image_list[i].img_preview_url);
							
							let series_name = '';
							let image_series = data.image_list[i].image_series;
							for(let s_name of image_series){
								series_name += '<span><button class="btn btn-theme03" style="padding: 2px 4px;">' + s_name + '</button></span>'
							}
							
							let tag_name = '';
							let image_tag = data.image_list[i].image_tag;
							if(image_tag.length > 0){
								tag_name += '<span style="margin-right: 5px;">Tags:</span>';
								for(let t_name of image_tag){
									tag_name += '<span style="margin-right: 5px;"><i>' + t_name + '</i></span>'
								}
							}
							
							_str = _str.replace("['series_name']", series_name);
							_str = _str.replace("['tag_name']", tag_name);
							
							_str = _str.replace("image_id", data.image_list[i].id);
							str += _str;
						}
						$(str).appendTo($("#demo"));
						
						// 需要先解绑，再绑定
						$('.witem').unbind('click').click(function() {
							$(this).toggleClass("image-selected");
							self.selectIds();
						});
					}
				}
			},
			path: function(page: any){
				return self.queryUrl + page;
			}
		});
	}
	
	ngOnInit(): void {
		this.getImageList();
	}
	
	// 父组件调用子组件中的方法
	refresh(): void {
		window.location.reload();
	}
}