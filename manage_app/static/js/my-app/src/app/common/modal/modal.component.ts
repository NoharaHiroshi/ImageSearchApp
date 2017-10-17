import { Component, Input } from '@angular/core';

declare var $: any;

require('./assets/modernizr.js');

@Component({
    selector: 'modal',
	templateUrl: './modal.html'
})
export class ModalComponent {
	@Input() tagName: String;
	
	ngOnInit(): void {
		$(this.tagName).on('click', function(event){
			event.preventDefault();
			$('.cd-popup').addClass('is-visible');
		});
		
		$('.cd-popup').on('click', function(event){
			if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
				event.preventDefault();
				$(this).removeClass('is-visible');
			}
		});
	}
	
}