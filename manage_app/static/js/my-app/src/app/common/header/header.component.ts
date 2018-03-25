import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../model/user';
import { Module } from '../../model/module';

import { HeaderService } from './header.service';
import { ListBaseComponent } from '../base.component';

declare var $: any;

@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	user: User;
	module_list: Module[];

	constructor(private service: HeaderService, public router: Router, public route: ActivatedRoute) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.user = data.user;
			this.module_list = data.module_list;
        });
	}
	
	changeModule(module_name: string): void {
		this.router.navigate([module_name]);
	}
}