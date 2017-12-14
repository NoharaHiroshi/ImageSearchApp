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
					itemSelector: '.witem',
					isFitWidth: true,
					isResizableL: true,
					isAnimated: false,
					// 给定间隔行宽度，如果不给出，默认使用第一张图的宽度，因此这里给出1
					columnWidth: 1
				});
				// debugger;
				// masonry 提供布局
				// 获取容器宽度
				let demo_width = $('#demo').width(),
					demo_top = $('#demo').offset().top;
				let image_divs = $('.witem');
				// 获取每一行有几张图
				let row_num_list: any = [];
				for(let i=0; i<image_divs.length; i++){
					let count: number = 0;
					for(let j=i+1; j<image_divs.length; j++){
						if($(image_divs[i]).offset().top == $(image_divs[j]).offset().top){
							count++;
						}
					}
					row_num_list.push({
						height: $(image_divs[i]).offset().top,
						count:(count + 1)
					})
					i += count;
				}
				console.log(row_num_list);
				for(let i=0; i<row_num_list.length; i++){
					
				}
				// 监听当前页的可视区域
				$(window).scroll(function(event){
					// console.log($(window).scrollTop());
					
				});
				/* setTimeout(function(){
					$("#demo").animate({
						opacity:'1'
					}, 100);
				}, 100); */
			}
			
		}
	}
}