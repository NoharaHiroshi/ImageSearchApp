import { Component, OnInit } from '@angular/core';

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

	constructor(private service: HeaderService, public config: AppConfig) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.user = data.user;
			this.module_list = data.module_list;
        });
	}
	
	changeModule(module_name: string): void {
		this.config.module = module_name;
	}
}