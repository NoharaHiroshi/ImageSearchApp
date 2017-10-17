import { Directive, ElementRef, Renderer } from '@angular/core';

declare var $: any;

require('./assets/icheck.js');

@Directive({
    selector: '[icheck]'
})
export class IcheckDirective {
	// constructor创建dom
    constructor(elem: ElementRef, renderer: Renderer) {}
	
	// ngOnInit将dom插入到html树中
	ngOnInit(): void {
		$('input').iCheck({
			checkboxClass: 'icheckbox_flat-green',
			radioClass: 'iradio_flat-green'
		});
	}
	
	
}