declare var $: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

@Component({
  selector: 'permission-root',
  templateUrl: './permission_list.html',
})
export class PermissionConfComponent{
	
}

@Component({
  selector: 'permission-detail-root',
  templateUrl: './permission_detail.html',
})
export class PermissionConfDetailComponent{
	
}