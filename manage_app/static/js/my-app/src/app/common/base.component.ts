declare var $: any;
import { Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AppConfig} from '../config/app_config';


@Component({
    selector: 'list-base',
    template:''
})
export class ListBaseComponent implements OnInit {
	isLoading = true;
	curPage = 1;
	queryParams = {};
	
    getPagerData(): void {}
	
	ngOnInit(): void {
		this.getPagerData();
	}
    
    refresh(): void {
        this.getPagerData();
    }
    
}
