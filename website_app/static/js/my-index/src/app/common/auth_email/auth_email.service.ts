import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot }   from '@angular/router';
import { AppConfig } from '../../../config/app_config';

import { BaseService } from '../../common/base.service';

@Injectable()
export class AuthEmailGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router, public config: AppConfig) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		return this.checkIsAuth(url);
	}
	
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}
	
	checkIsAuth(url: string): boolean {
		console.log(this.config.user);
		if(this.config.user) {
			if(this.config.user.is_auth){
				return true;
			}else{
				this.router.navigate(["/auth_email"]);
				return false;
			}
		}else{
			return true;
		}
	}
}