import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';

require('./masonry.min.js');
require('./jquery.flex-images.js')

declare var swal: any;
declare var $: any;

@Component({
    selector: 'masonry',
	templateUrl: './masonry.html',
})
export class MasonryComponent implements OnInit {
	@Input() image_list: any;
	isLoading: boolean = true;
	
	@Input() type: any;
	
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
	
	ngAfterViewInit(): void {
		console.log('masonry.ngAfterViewInit');
	}
	
	/* ngAfterContentInit(): void{
		console.log('masonry.ngAfterContentInit');
	}
	
	ngAfterContentChecked(): void{
		console.log('masonry.ngAfterContentChecked');
	} */
	
	/* isAllImageLoaded(image_doms: any[]): void{
		console.log('isAllImageLoaded');
		let self = this;
		let all_image_loaded: boolean = true;
		for(let image_dom of image_doms){
			if(image_dom.width == 0){
				all_image_loaded = false;
				if(!all_image_loaded){
					// 递归调用
					setTimeout(function(){
						self.isAllImageLoaded(image_doms)
					}, 200)
				}
			}
		}
		console.log('timeInterval end');
		return true;
	} */
	
	ngAfterViewChecked(): void{
		// console.log('masonry.ngAfterViewChecked');
		let _height = 280;
		let demo_width = $('#demo').width(),
			image_divs = $('.witem');
		if(this.image_list){
			if(this.type == 'background'){
				if(this.image_list.length == image_divs.length){
					for(let i=0; i<image_divs.length; i++){
						let image_div = image_divs[i],
							image_obj = this.image_list[i],
							_w = _height / image_obj.height * image_obj.width,
							_h = _height;
						$(image_div).attr('data-w', _w);
						$(image_div).attr('data-h', _h);
					}
				}
				$(this.demo.nativeElement).flexImages({rowHeight: 300, container: '.witem' });
			}
			/* $(this.demo.nativeElement).masonry({
				// options... 
				itemSelector: '.witem',
				isFitWidth: true,
				isResizableL: true,
				isAnimated: false,
				columnWidth: 1
			}); */
			// 获取每一行有几张图
			/* let row_num_list: any = [];
			for(let i=0; i<image_divs.length; i++){
				let count: number = 0;
				for(let j=i+1; j<image_divs.length; j++){
					if($(image_divs[i]).position().top == $(image_divs[j]).position().top){
						count++;
					}
				}
				row_num_list.push({
					height: $(image_divs[i]).position().top,
					count:(count + 1)
				})
				i += count;
			}
			for(let i=0; i<row_num_list.length; i++){
				if()
			} */
				// 监听当前页的可视区域
				/* $(window).scroll(function(event){
					// console.log($(window).scrollTop());
					
				}); */
				/* setTimeout(function(){
					$("#demo").animate({
						opacity:'1'
					}, 100);
				}, 100); */
			
		}
	}
}