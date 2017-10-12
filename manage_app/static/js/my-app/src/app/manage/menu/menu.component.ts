declare var $: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

@Component({
  selector: 'menu-root',
  templateUrl: './menu_list.html',
})
export class MenuConfComponent{
	
}

@Component({
  selector: 'menu-detail-root',
  templateUrl: './menu_detail.html',
})
export class MenuConfDetailComponent{
	
}