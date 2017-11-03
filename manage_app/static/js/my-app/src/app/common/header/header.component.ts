import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user';
import { HeaderService } from './header.service';
import { ListBaseComponent } from '../base.component';

declare var $: any;

@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	user: User;

	constructor(private service: HeaderService) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	this.user = data.user;
        });
	}
}