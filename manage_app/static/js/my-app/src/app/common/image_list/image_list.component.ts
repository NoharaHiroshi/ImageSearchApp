import { Component, Input, Output, EventEmitter } from '@angular/core';

require('./waterfall.js');

declare var $: any;

@Component({
    selector: 'image-list',
	templateUrl: './image_list.html',
})
export class ImageQueryComponent {
	constructor() {};
	
	ngOnInit(): void {
		const query_url = 'http://127.0.0.1:8888/manage/image_list?page=';
		// 流体式布局
		$("#demo").waterfall({
			itemCls: "witem",
			isFadeIn: true,
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
						var templ = `<div class="witem">
										<img src="/static/[src]" width="225"/>
									</div>`

						for(var i = 0; i < data.image_list.length; i++) {
							let _str = ''
							_str = templ.replace("[src]", data.image_list[i].img_preview_url);
							_str = _str.replace("image_id", data.image_list[i].id);
							str += _str;
						}
						$(str).appendTo($("#demo"));
						
						$('.witem').click(function () {
							$(this).toggleClass('image-selected');
							if ($('.witem.image-selected').length == 0)
								$('.image-select').removeClass('image-selected');
							else
								$('.image-select').addClass('image-selected');
							counter();
						});
						
						$('.image-select').click(function () {
							if ($('.witem.image-selected').length == 0) {
								$('.witem').addClass('image-selected');
								$('.image-select').addClass('image-selected');
							}
							else {
								$('.witem').removeClass('image-selected');
								$('.image-select').removeClass('image-selected');
							}
							counter();
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