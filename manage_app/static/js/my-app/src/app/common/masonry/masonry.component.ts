import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';

require('./masonry.min.js');

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
	
	/* ngOnChanges(): void {
		console.log('masonry.ngOnChanges');
	} */
	
	constructor(private elem: ElementRef){}
	
	ngOnInit(): void {
		// debugger;
		// 此时image_list还未返回值，因此witem还未渲染;
	}
	
	/* ngAfterViewInit(): void {
		console.log('masonry.ngAfterViewInit');
	} */
	
	/* ngAfterContentInit(): void{
		console.log('masonry.ngAfterContentInit');
	}
	
	ngAfterContentChecked(): void{
		console.log('masonry.ngAfterContentChecked');
	} */
	
	ngAfterViewChecked(): void{
		// console.log('masonry.ngAfterViewChecked');
		if(this.image_list){
			let all_image_loaded: boolean = false;
			// this.image_list获取到之后，立即渲染模板，生成witem
			// console.log('--> this.demo.nativeElement');
			// console.log(this.demo.nativeElement);
			// 出现排布问题是因为masonry重新排布图片时，图片未加载完毕，未能有效获取宽高信息
			let image_doms = $('.witem-image');
			// 当所有图片都加载完成时，改变标记状态
			for(let image_dom of image_doms){
				$(image_dom).load(function(){});
			}
			all_image_loaded = true;
			if(all_image_loaded == true){
				$(this.demo.nativeElement).masonry({
					// options... 
					columnWidth: 150,
					itemSelector: '.witem',
					isFitWidth: true
				});
				// masonry 提供布局
				let image_divs = $('.witem');
				/* console.log('demo height: ' + image_divs.height());
				console.log('window height: ' + $(window).height());
				console.log('scroll height: ' + $(window).scrollTop()); */
				for(let image_div of image_divs){
					console.log(image_div);
					console.log('image_div height: ' + $(image_div).offset().top);
					// console.log('window height: ' + $('#demo').scrollTop());
					// console.log($(image_div).offset().top - $(window).scrollTop());
				}
				/* setTimeout(function(){
					$("#demo").animate({
						opacity:'1'
					}, 100);
				}, 100); */
			}
			
		}
	}
}