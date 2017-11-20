import { Component, Input, Output, EventEmitter } from '@angular/core';

require('./jquery.masonry.min.js');

declare var $: any;

@Component({
    selector: 'image-list',
	templateUrl: './masonry.html'
})
export class MasonryComponent {
	@Input() image_list: any[];
	
	hasLoaded: boolean = false;
	
	constructor() {};
	
	ngOnInit(): void { 
		let self = this;
		// 流体式布局
		setTimeout(function(){
			let $container = $('#con1_1');   
			$container.imagesLoaded(function(){
				$container.masonry({
					itemSelector: '.product_list',
					columnWidth: 5 //每两列之间的间隙为5像素
				});
			}); 
			this.hasLoaded = true;
		}, 100)
	}
}