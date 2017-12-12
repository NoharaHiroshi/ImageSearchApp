import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';

require('./masonry.min.js');
require('./AnimOnScroll.js');

declare var swal: any;
declare var $: any;

@Component({
    selector: 'masonry',
	templateUrl: './masonry.html',
})
export class MasonryComponent implements OnInit {
	@Input() image_list: any;
	isLoading: boolean = true;
	
	@ViewChildren('witem')
	witems: ElementRef;
	
	@ViewChild('demo')
	demo: ElementRef;
	
	ngOnChanges(): void {
		console.log('masonry.ngOnChanges');
	}
	
	constructor(private elem: ElementRef){}
	
	ngOnInit(): void {
		console.log('masonry.ngOnInit');
		console.log('jquery.fn: ');
		console.log($.fn);
		// debugger;
		// 此时image_list还未返回值，因此witem还未渲染;
	}
	
	ngAfterViewInit(): void {
		console.log('masonry.ngAfterViewInit');
		/* setTimeout(() => {
			$(this.demo.nativeElement).masonry({
				// options... 
				itemSelector: '.witem',
				columnWidth: 20 //每两列之间的间隙为5像素
			});
		}, 300); */
	}
	
	ngAfterContentInit(): void{
		console.log('masonry.ngAfterContentInit');
	}
	
	ngAfterContentChecked(): void{
		console.log('masonry.ngAfterContentChecked');
	}
	
	ngAfterViewChecked(): void{
		console.log('masonry.ngAfterViewChecked');
		if(this.image_list){
			let all_image_loaded: boolean = false;
			// this.image_list获取到之后，立即渲染模板，生成witem
			console.log('--> this.demo.nativeElement');
			console.log(this.demo.nativeElement);
			// 出现排布问题是因为masonry重新排布图片时，图片未加载完毕，未能有效获取宽高信息
			console.log('--> this.image_list');
			console.log(this.image_list);
			let image_doms = $('.witem-image');
			for(let image_dom of image_doms){
				$(image_dom).load(function(){});
				all_image_loaded = true;
			}
			if(all_image_loaded == true){
				$(this.demo.nativeElement).masonry({
					// options... 
					columnWidth: 150,
					itemSelector: '.witem',
					isFitWidth: true
				});

			}
			console.log(window);
		}
	}
}