import { Directive, ElementRef, Renderer, Input } from '@angular/core';

declare var $: any;

require('./assets/jquery.modal.js');

@Directive({
    selector: '[modal]',
})
export class ModalDirective {
	
	constructor(private elem: ElementRef, private renderer: Renderer) {}
	
	@Input('modal') funcName: string;
	
	ngOnInit(): void {
		if(this.funcName == 'del'){
			$('body').append(`
				<div class="modal">
				  <div class="modal-body">
					确定删除？
				  </div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-default">取消</button>
					<button type="button" class="btn btn-primary">确定</button>
				  </div>
				</div>
			`);
		}
	}
	
}