import { Component, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked} from '@angular/core';

import { LoginService } from './login.service';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { ListBaseComponent } from '../base.component';

import { Banner } from '../../model/banner';
import { WebsiteMenu } from '../../model/website_menu';
import { HotSearch } from '../../model/hot_search';
import { Customer } from '../../model/customer';

import { AppConfig } from '../../../config/app_config';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.html',
})

export class LoginComponent{
	
	ngAfterViewChecked(): void {
		let self = this;
		$('.phone-login').click(function(){
			$('.login-box').show();
			$('.account-box').show();
			$('.other-login').show();
			$('.login-others').hide();
			$(this).hide();
		})
		$('.other-login').click(function(){
			$('.login-others').show();
			$('.phone-login').show();
			$('.login-box').hide();
			$('.account-box').hide();
			$(this).hide();
		})
	}
}