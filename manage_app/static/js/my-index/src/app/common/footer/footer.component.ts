import { Component, OnInit } from '@angular/core';

import { FooterService } from './footer.service';
import { ListBaseComponent } from '../base.component';

declare var $: any;

@Component({
  selector: 'website-footer-root',
  templateUrl: './footer.html',
})

export class FooterComponent implements OnInit {
	
	constructor(private service: FooterService) {}
	
	ngOnInit(): void {
		this.service.getInfo().then(data => {
        	
        });
	}
}