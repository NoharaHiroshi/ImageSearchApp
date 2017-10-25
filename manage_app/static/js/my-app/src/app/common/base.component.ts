declare var $: any;
declare var swal: any;
import { Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AppConfig} from '../config/app_config';

@Component({
    selector: 'list-base',
    template:''
})
export class ListBaseComponent implements OnInit {
	public isLoading = true;
	public isDisabledButton = false;
	public isConfirm = false;
	public curPage = 1;
	public queryParams = {};
	
    getPagerData(): void {}
	
	ngOnInit(): void {
		this.getPagerData();
	}
    
    refresh(): void {
        this.getPagerData();
    }
	
	selectChecked(): String {
		let obj_list = [];
		let objs = $('input[name="checked"]:checked');
		for(let obj of objs){
			obj_list.push(obj.value);
		}
		return obj_list.join(',');
	}   
}
