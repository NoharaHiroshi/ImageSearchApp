import { Injectable } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';


@Injectable()
export class CurrentUser {
	name: string;
	email: string;
	phone: string;
	
	is_type_manage: boolean;
	is_type_super_manage: boolean;
	is_status_active: boolean;
}