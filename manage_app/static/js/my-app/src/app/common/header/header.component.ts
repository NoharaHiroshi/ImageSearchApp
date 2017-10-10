import { Component, OnInit } from '@angular/core';

import { Menu } from '../../model/menu';

declare var $: any;

@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	navList: Menu[];
	constructor() {}
	
	ngOnInit(): void {
		
	}
}