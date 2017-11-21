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
			maxPage: 5, 
			isFadeIn: true,
			dataType: 'json', 
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
						var str = "";
						var templ = `<div class="witem">
											<img src="/static/[src]" height="200px"/>
									</div>`

						for(var i = 0; i < data.image_list.length; i++) {
							let _str = ''
							_str = templ.replace("[src]", data.image_list[i].img_preview_url);
							str += _str;
						}
						$(str).appendTo($("#demo"));
					}
				}
			},
			path: function(page: any){
				return query_url + page;
			}
		});
	}
}