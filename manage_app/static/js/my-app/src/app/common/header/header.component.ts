import { Component, OnInit } from '@angular/core';
import { AppConfig} from '../../config/app_config';

import { Menu } from '../../model/menu';


@Component({
  selector: 'header-root',
  templateUrl: './header.html',
})

export class HeaderComponent implements OnInit {
	navList: Menu[];
	constructor(public app: AppConfig) {}
	
	ngOnInit(): void {
		
	}
}