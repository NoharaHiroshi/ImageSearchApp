import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

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
	
	constructor(private elem: ElementRef){}
	
	ngOnInit(): void {
	}
	
	ngAfterViewInit(): void {
		setTimeout(() => {
			$(this.demo.nativeElement).masonry({
				// options... 
				itemSelector: '.witem',
				columnWidth: 20 //每两列之间的间隙为5像素
			});
		}, 300);
	}
	
}