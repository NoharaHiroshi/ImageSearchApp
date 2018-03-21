import { Component, OnInit } from '@angular/core';
import { AppConfig } from './config/app_config';

declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app_index.html',
})
export class AppComponent {
	constructor(public config: AppConfig) {}
}