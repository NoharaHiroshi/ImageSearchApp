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
	downloadTemplate(templateType:string): Promise<any> {
		const url = `/manage/template/download`;
		return this.post(url, {'type':templateType});
	}
	
	iconList(): Promise<any> {
		const url = `/common/sys/icon/ist`;
		return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
	}
}
