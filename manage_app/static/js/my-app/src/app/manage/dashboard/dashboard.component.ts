declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { DashboardService } from './dashboard.service';
import { ListBaseComponent } from '../../common/base.component';

import { DashboardInfo } from '../../model/dashboard';

@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard_detail.html',
})
export class DashboardConfComponent extends ListBaseComponent implements OnInit{
	dashboard_info: DashboardInfo;
	
	constructor(private service: DashboardService) {}
	
	ngOnInit(): void {
		this.service.getDashboardInfo().then(data => {
        	this.dashboard_info = data.dashboard_info
        });
	}
}