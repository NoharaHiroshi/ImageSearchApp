import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { LoginService } from './login.service';
import { AppConfig } from '../../config/app_config';

declare var $: any;

@Component({
	selector: 'login-root',
	templateUrl: './login.html',
})
export class LoginComponent {
	token: string;
	username: string;
	password: string;
	returnInfo: stirng;
	
	constructor(private config: AppConfig, private service: LoginService, private router: Router) {}
	
	ngOnInit(): void {
		let self = this;
		if(this.config.user){
			let tmp_url = this.config.tmp_url;
			this.router.navigate([tmp_url]);
		}else{
			this.service.getLoginPage().then(data => {
				this.token = data.token;
			}
		}
	}
	
	login(): void {
		this.service.login(this.username, this.password, this.token).then(res => {
			if(res.response=='fail'){
				console.log('fail', res.info);
				this.returnInfo = res.info;
			}else{
				console.log('success', '登陆成功');
				this.config.user = res.user;
				let tmp_url = this.config.tmp_url
				this.router.navigate([tmp_url]);
			}
		});
	}
}