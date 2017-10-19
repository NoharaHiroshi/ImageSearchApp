import { Directive, ElementRef, Renderer, Input } from '@angular/core';

declare var $: any;

require('./assets/jquery.modal.js');

@Directive({
    selector: '[modal]',
})
export class ModalDirective {
	
	constructor(private elem: ElementRef, private renderer: Renderer) {}
	
	@Input() funcName: string;
	
	ngOnInit(): void {
		if(this.funcName == 'del'){
			$('body').append(`
				<div class="modal">
					<p>
						确定删除？
					</p>
				</div>
			`);
		}
		$(this.elem.nativeElement).click(function(event: any) {
			event.preventDefault();
			$('.modal').modal({
				fadeDuration: 250
			});
		});
	}
	
}