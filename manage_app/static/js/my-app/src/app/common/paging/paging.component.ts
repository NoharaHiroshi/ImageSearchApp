import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';

require('./paging.js');

declare var $: any;

@Component({
    selector: 'paging',
	templateUrl: './paging.html',
})
export class PageComponent{
	@Input() current_page: number;
	@Input() all_page: number;
	@Input() all_num: number;
	@Output() selected_page = new EventEmitter<any>();  
	
	ngAfterViewChecked(): void {
		let self = this;
		$("#paging").paging({
			pageNo: this.current_page,
			totalPage: this.all_page,
			totalSize: this.all_num,
			callback: function(num: number) {
				self.selected_page.emit(num);
			}
		})
	}
}