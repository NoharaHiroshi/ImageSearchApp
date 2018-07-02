declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
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
			}else if(data.response == 'NeedLogin'){
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

@Component({
	selector: 'verify-emaill-effect-root',
	templateUrl: './verify_email_effect.html',
})
export class VerifyEmailEffectComponent extends ListBaseComponent implements OnInit {
	constructor(private config: AppConfig, private service: SendAuthEmailService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	info: string;
	status: string;
	
	@ViewChild(SendAuthEmailComponent)
	private sendAuthEmailComponent: SendAuthEmailComponent;
	
	ngOnInit(): void {
		let self = this;
		this.route.queryParams.switchMap(params => this.service.verifyEmailEffect(params['en_str'] || ''))
		.subscribe(res => {
			self.status = res.response;
			if(res.response == 'ok'){
				self.info = res.info;
				setTimeout(function(){
					self.router.navigate(['/']);
				}, 3000);
			}else if(res.response == 'NeedLogin'){
				this.config.isLoginOpen = true;
			}else{
				self.info = res.info;
			}
		})
	}
}