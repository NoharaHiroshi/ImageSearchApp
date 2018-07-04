declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { ListBaseComponent } from '../../../common/base.component';

import { ExchangeCodeService } from './exchange_code.service';

import { AppConfig } from '../../../../config/app_config';

@Component({
  selector: 'user-exchange-code-root',
  templateUrl: './exchange_code.html',
})
export class ExchangeCodeComponent extends ListBaseComponent{
	exchange_info: string;
	code: string;
	
	constructor(private config: AppConfig, public service: ExchangeCodeService) {
		super();
	}
	
	getPagerData(): any {
		let self = this;
		this.config.isLoading = true
		this.service.getDetail().then(res => {
			if(this.config.authCheck(res)){
				this.config.isLoading = false;
			}
		});
	}
	
	exchangeCode(code: string): void {
		let self = this;
		this.service.exchange(code).then(res => {
			if(this.config.tipCheck(res)){
				self.exchange_info = res['info'];
			}
		})
	}
}