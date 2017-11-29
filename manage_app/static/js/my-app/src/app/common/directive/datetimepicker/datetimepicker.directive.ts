declare var $: any;

import {
    Directive,
    ElementRef,
    Renderer,
    Input,
    OnInit,
    EventEmitter,
    Output,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {SetOptions} from 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment';

@Directive({
    selector: '[a2e-datetimepicker]'
})
export class DateTimePickerDirective implements OnInit, OnChanges {

    @Input() date: moment.Moment;
    @Input() options: SetOptions;
    
    @Output() onChange: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    
    default_options = {format: 'YYYY-MM-DD', keepOpen: false, showClose:true, viewMode: 'days', locale: 'zh-CN', useCurrent: false, allowInputToggle: true, showClear:true, ignoreReadonly:true};
    
    private dpElement: any;

    constructor(el: ElementRef, renderer: Renderer) {
        let $parent = $(el.nativeElement.parentNode);
        this.dpElement = $parent.hasClass('input-group') ? $parent : $(el.nativeElement);
    }

    ngOnInit(): void {
        if(!!this.options){
        	$.extend(this.default_options, this.options);
        }
    	
    	if(!this.date){
    		this.date = null;
    	}
    	
		console.log($.fn);
        this.dpElement.datetimepicker(this.default_options);
        this.dpElement.data('DateTimePicker').date(this.date);

        this.dpElement.on('dp.change', (e:any) => {
            if (this.date && e.date.valueOf() !== this.date.valueOf()) {
                this.date = e.date;
                this.onChange.emit(e.date);
            }
        });

        this.dpElement.on('click', () => this.onClick.emit());
    }

    ngOnChanges(changes: SimpleChanges): void {
        let dpe = this.dpElement.data('DateTimePicker');
        if (!!dpe) {
            let options = changes['options'];
            let date = changes['date'];

            if (!!options) {
                $.map(options.currentValue, (value: any, key: any) => {
                    dpe[key](value);
                });
            }

            if (!!date) {
                dpe.date(date.currentValue);
            }
        }
    }
}
