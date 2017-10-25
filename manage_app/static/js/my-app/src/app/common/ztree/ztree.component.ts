import { Component, Input } from '@angular/core';

import 'ztree';
declare var $: any;

@Component({
    selector: 'ztree',
	templateUrl: './ztree.html'
})
export class ZtreeComponent {
	@Input() data: any;
	
	constructor() {}
	
	ngOnInit(): void {
		// ztree对象
		let zTree: any;
		
		// ztree配置
		let setting = {};
		console.log(this.data);
		let zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, this.data);
	}
}