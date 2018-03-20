import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }   from '@angular/router';

@Injectable()
export class AuthService {
	isLogined = false;
	
	redirectUrl: string;
	
	login(): Observable<boolean> {
		return Observable.of(true).delay(1000).do(val => this.isLogined = true);
	}
	
	logout(): void {
		this.isLogined = false;
	}
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		// 当前访问路由地址 例如：/func_conf
		let url: string = state.url;
		return this.checkLogin(url);
	}
	
	checkLogin(url: string): boolean {
		if(this.authService.isLogined) {
			return true;
		}else{
			this.authService.redirectUrl = url;
			return false;
		}
	}
}