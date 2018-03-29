import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../model/user';
import { Module } from '../../model/module';

import { HeaderService } from './header.service';
import { ListBaseComponent } from '../base.component';

import { AppConfig } from '../../config/app_config';

declare var $: any;

@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	user: User;
	module_list: Module[];

	constructor(private service: HeaderService, public router: Router, public config: AppConfig, public location: Location,) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.user = data.user;
			this.module_list = data.module_list;
        });
	}
	
	changeModule(module_name: string): void {
		this.router.navigate([module_name]);
	}
	
	logout(): void {
		this.service.logout().then(data => {
        	if(data.response == 'ok'){
				this.config.user = '';
				this.router.navigate(['/login']);
			}
        });
	}
}