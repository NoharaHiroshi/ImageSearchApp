import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig} from '../config/app_config';
import { BaseService } from './base.service';


@Injectable()
export class CommonService extends BaseService{
	constructor(http: Http) { 
		super(http);
	}
}
