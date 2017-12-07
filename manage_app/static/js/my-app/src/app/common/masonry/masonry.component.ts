import { Component, Input, Output, EventEmitter } from '@angular/core';

require('./masonry.min.js');

declare var swal: any;
declare var $: any;

@Component({
    selector: 'masonry',
	templateUrl: './masonry.html',
})
export class MasonryComponent {
	
	ngOnInit(): void {	
		console.log($.fn);
		$('#demo').masonry({
			// options... 
			itemSelector: '.witem',
			columnWidth: 200
		});
	}
}