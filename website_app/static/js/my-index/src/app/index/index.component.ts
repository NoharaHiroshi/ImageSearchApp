import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../config/app_config';

declare var $: any;

@Component({
	selector: 'index-root',
	templateUrl: './index.html',
})
export class IndexComponent {
	constructor(public config: AppConfig){}
}