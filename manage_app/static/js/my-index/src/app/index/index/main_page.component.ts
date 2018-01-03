declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { MainPageService } from './main_page.service';
import { ListBaseComponent } from '../../common/base.component';


@Component({
  selector: 'main-page-root',
  templateUrl: './main_page.html',
})
export class MainPageComponent extends ListBaseComponent implements OnInit{
	
	constructor(private service: MainPageService) {
		super();
	}
	
	ngOnInit(): void {
		this.service.getMainPageInfo().then(data => {
			
        });
	}
}