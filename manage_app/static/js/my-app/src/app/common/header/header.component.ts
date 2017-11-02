import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user';
import { HeaderService } from './header.service';
import { ListBaseComponent } from './base.component';

declare var $: any;

@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent extends ListBaseComponent implements OnInit {
	constructor() {}
	
	ngOnInit(): void {
		
	}
}