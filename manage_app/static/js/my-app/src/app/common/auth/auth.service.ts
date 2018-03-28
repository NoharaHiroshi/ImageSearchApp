import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot }   from '@angular/router';
import { AppConfig } from '../../config/app_config';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router, private config: AppConfig) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		// 当前访问路由地址 例如：/func_conf
		let url: string = state.url;
		return this.checkLogin(url);
	}
	
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}
	
	checkLogin(url: string): boolean {
		console.log('this.config.user: ' + this.config.user);
		if(this.config.user) {
			return true;
		}else{
			this.config.tmp_url = url;
			this.router.navigate(["/login"]);
			return false;
		}
	}
}