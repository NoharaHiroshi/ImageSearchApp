declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { AppConfig } from '../../../../config/app_config';

@Component({
  selector: 'user-exchange-code-root',
  templateUrl: './exchange_code.html',
})
export class ExchangeCodeComponent {
	
	constructor(private config: AppConfig) {}
}