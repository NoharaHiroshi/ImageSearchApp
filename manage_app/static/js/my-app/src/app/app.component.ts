import { Component, OnInit } from '@angular/core';
import { AppConfig } from './config/app_config';

import { HeaderService } from './common/header/header.service';
import { ListBaseComponent } from './common/base.component';

declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app_index.html',
})
export class AppComponent extends ListBaseComponent implements OnInit {
	constructor(public config: AppConfig, public service: HeaderService) {
		super();
	}
	
	ngOnInit(): void {
		this.service.getCurUser().then(user => {
			this.config.user = user;
        });
	}
}