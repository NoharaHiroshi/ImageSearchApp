import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

require('./masonry.min.js');

declare var swal: any;
declare var $: any;

@Component({
    selector: 'masonry',
	templateUrl: './masonry.html',
})
export class MasonryComponent implements OnInit {
	@Input() image_list: any;
	
	ngOnInit(): void {	
		setTimeout(function(){
			$('#demo').masonry({
				// options... 
				itemSelector: '.witem',
				columnWidth: 20 //每两列之间的间隙为5像素
			});
		}, 100)
	}
}