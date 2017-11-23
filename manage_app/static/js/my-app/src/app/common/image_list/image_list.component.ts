import { Component, Input, Output, EventEmitter } from '@angular/core';

require('./waterfall.js');

declare var swal: any;
declare var $: any;

@Component({
    selector: 'image-list',
	templateUrl: './image_list.html',
})
export class ImageQueryComponent {
	constructor() {};
	
	ngOnInit(): void {
		const query_url = 'http://127.0.0.1:8888/manage/image_list?page=';
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
					if (!isBeyondMaxPage) {
						$loading.fadeOut();
					}else{
						$loading.hide();
					}
				},
				renderData: function (data: any, dataType: any) {
					if (dataType === 'json'){
						var max_page = data.meta.all_page,
							cur_page = data.meta.cur_page;
						
						if (cur_page == max_page) {
							$("#demo").waterfall('pause', function() {
								$('#demo-info').html('<p style="color:#666;">没有更多内容...</p>')
							});
						}
						
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
						});
					}
				}
			},
			path: function(page: any){
				return query_url + page;
			}
		});
	}
}