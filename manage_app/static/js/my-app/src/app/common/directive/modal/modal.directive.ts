import { Directive, ElementRef, Renderer, Input } from '@angular/core';

declare var $: any;

require('./assets/jquery.modal.js');

@Directive({
    selector: '[modal]',
})
export class ModalDirective {
	@Input() funcName: string;
	
	constructor(elem: ElementRef, renderer: Renderer) {
		let self = this;
		if(this.funcName == 'del'){
			$('body').append(`
			<div class="modal">
				<p>
					确定删除？
				</p>
			</div>
		`);
		}
		$(elem.nativeElement).click(function(event: any) {
			console.log('funcName:' + self.funcName);
			event.preventDefault();
			$('.modal').modal({
				fadeDuration: 250
			});
		});
	}
	
}