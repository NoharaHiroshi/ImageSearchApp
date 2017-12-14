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
		// 第一次debug：图片未完全加载
		// 第二次debug：图片完全加载，但masonry未生效
		console.log('masonry.ngAfterViewChecked');
		console.log(this.image_list);
		if(this.image_list){
			console.log('ok!');
			let all_image_loaded: boolean = true;
			// this.image_list获取到之后，立即渲染模板，生成witem
			// console.log('--> this.demo.nativeElement');
			// console.log(this.demo.nativeElement);
			// 出现排布问题是因为masonry重新排布图片时，图片未加载完毕，未能有效获取宽高信息
			let image_doms = $('.witem-image');
			// 当所有图片都加载完成时，改变标记状态
			// 利用图片未加载时高度为0的特性判断是否加载完成
			for(let image_dom of image_doms){
				if(image_dom.width === 0){
					all_image_loaded = false;
					break;
				}
			}
			debugger
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
					let _count = count + 1;
					row_num_list.push({
						elems: image_divs.slice(i, i + _count),
						height: $(image_divs[i]).offset().top,
						count: _count
					})
					i += count;
				}
				for(let i=0; i<row_num_list.length; i++){
					let count: number = row_num_list[i].count;
					let _width: number = (demo_width - 5 * (count - 1)) / count;
					for(let elem of row_num_list[i].elems){
						$(elem).width(_width);
					}
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