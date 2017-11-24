import { Component, Input, Output, EventEmitter } from '@angular/core';

require('./waterfall.js');

declare var swal: any;
declare var $: any;

@Component({
    selector: 'image-list',
	templateUrl: './image_list.html',
})
export class ImageQueryComponent {
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
		const query_url = 'http://127.0.0.1:8888/manage/image_list?page=';
		let self = this;
		// 流体式布局
		$("#demo").waterfall({
			itemCls: "witem",
			colWidth: 255,
			gutterWidth: 15,
			gutterHeight: 15,
			maxPage: 7,
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
									</div>`

						for(var i = 0; i < data.image_list.length; i++) {
							let _str = ''
							_str = templ.replace("[src]", data.image_list[i].img_thumbnail_url);
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
				return query_url + page;
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