import { Component, OnInit } from '@angular/core';
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
	
	constructor(private config: AppConfig, private service: LoginService) {}
	
	ngOnInit(): void {
		let self = this;
		this.service.getLoginPage().then(data => {
			this.token = data.token;
		})
	}
	
	login(): void {
		this.service.login(this.username, this.password, this.token).then(res => {
			if(res.response=='fail'){
				console.log('fail', res.info);
			}else{
				console.log('success', '登陆成功');
			}
		});
	}
}