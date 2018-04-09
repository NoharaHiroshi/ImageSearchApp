declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';
import { AppConfig } from '../../../config/app_config';

import { ListBaseComponent } from '../../common/base.component';
import { User } from '../../model/user';

import { SendAuthEmailService } from './send_auth_email.service';

@Component({
  selector: 'send-auth-email-root',
  templateUrl: './send_auth_email.html',
})
export class SendAuthEmailComponent extends ListBaseComponent implements OnInit{
	user: User;
	email_login_url: string;
	
	constructor(private config: AppConfig, private service: SendAuthEmailService) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
		this.service.getUserInfo().then(data => {
			if(data.response == 'ok'){
				this.user = data.user;
				this.email_login_url = data.email_login_url;
			}else{
				this.config.isLoginOpen = true;
			}
        });
	}
	
	sendAuthEmail(): void {
		let self = this;
		this.service.sendAuthEmail().then(data => {
			if(data.response == 'ok'){
				console.log('发送成功');
			}else{
				console.log(data.info);
			}
		})
	}
}