import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot }   from '@angular/router';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { AppConfig } from '../../config/app_config';

import { CheckLoginService } from './check_login.service';
import { BaseService } from '../../common/base.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router, private config: AppConfig, private service: CheckLoginService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		// 当前访问路由地址 例如：/func_conf
		let url: string = state.url;
		return this.checkLogin(url);
	}
	
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}
	
	checkLogin(url: string): boolean {
		if(this.config.user){
			return true;
		}else{
			this.config.tmp_url = url;
			this.service.checkLogin().then(res => {
				if(res.response == 'active'){
					this.config.user = res.user;
					this.router.navigate([url]);
				}else{
					this.router.navigate(["/login"]);
					return false;
				}
			});
		}
	}
}