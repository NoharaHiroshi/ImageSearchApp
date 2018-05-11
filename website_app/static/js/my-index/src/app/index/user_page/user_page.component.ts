declare var $: any;
declare var swal: any;

import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { UserPageService } from './user_page.service';
import { ListBaseComponent } from '../../common/base.component';

import { AppConfig } from '../../../config/app_config';

@Component({
  selector: 'user-page-root',
  templateUrl: './user_page.html',
})
export class UserPageComponent extends ListBaseComponent implements OnInit{
	
	constructor(private config: AppConfig, private service: UserPageService, public route: ActivatedRoute, public router: Router, private elem: ElementRef) {
		super();
	}
}