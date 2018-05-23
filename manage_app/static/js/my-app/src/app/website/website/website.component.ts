declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, DoCheck, Input, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { WebsiteInfo } from '../../model/website_info';

import { WebsiteInfoService } from './website.service';

@Component({
  selector: 'website-root',
  templateUrl: './website.html',
})
export class WebsiteConfComponent extends ListBaseComponent{
	website_info: WebsiteInfo;
	
	constructor(private service: WebsiteInfoService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getWebsiteInfo().then(data => {
        	this.website_info = data.website_info;
			this.isLoading = false;
        });
	}
	
	save(): void {
		this.service.update(this.website_info).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', res.info);
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
			}
		});
	}
}