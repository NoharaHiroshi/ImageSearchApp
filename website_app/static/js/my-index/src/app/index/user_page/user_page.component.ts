declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { AppConfig } from '../../../config/app_config';

@Component({
  selector: 'user-page-root',
  templateUrl: './user_page.html',
})
export class UserPageComponent {
	
	constructor(private config: AppConfig) {}
}