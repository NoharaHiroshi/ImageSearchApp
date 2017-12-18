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
	
	@Output() delIds = new EventEmitter<any>();  
	
	selectIds(): void {
		let obj_list = [];
		let objs = $('.image-selected');
		for(let obj of objs){
			obj_list.push(obj.id);
		}
		let del_ids = obj_list.join(',');
		this.delIds.emit(del_ids);
	}
	
	@ViewChildren('witem')
	witems: ElementRef;
	
	@ViewChild('demo')
	demo: ElementRef;
	
	constructor(private elem: ElementRef){}
	
	ngOnInit(): void {}
	
	ngAfterViewChecked(): void{
		let self = this;
		let _height = 280;
		let demo_width = $('#demo').width(),
			image_divs = $('.witem');
		if(this.image_list){
			$('.witem').unbind('click').click(function() {
				$(this).toggleClass("image-selected");
				self.selectIds();
			});
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
		}
	}
}