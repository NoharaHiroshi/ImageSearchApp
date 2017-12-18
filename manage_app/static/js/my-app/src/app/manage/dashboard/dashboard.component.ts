declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard_detail.html',
})
export class DashboardConfComponent extends ListBaseComponent{
}