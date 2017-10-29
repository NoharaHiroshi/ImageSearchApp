import { Component, Input, Output, EventEmitter } from '@angular/core';

import 'ztree';
declare var $: any;

@Component({
    selector: 'ztree',
	templateUrl: './ztree.html'
})
export class ZtreeComponent {
	@Input() data: any;
	@Output() selectedNodes = new EventEmitter();   
	
	nodes: any;
	
	constructor() {}
	
	ngOnInit(): void {
		// ztree对象
		let zTree: any;
		
		// ztree配置
		let setting = {
			view: {
				dblClickExpand: false,
				showIcon: false,
				showLine: true,
			},
			check: {
				enable: true,
				chkboxType: { "Y": "ps", "N": "ps" },
				chkStyle: "checkbox"
			}
		};
		
		let zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, this.data);
		$("#select-all").click(function(){ 
			this.nodes = zTreeObj.getCheckedNodes(true); 
			console.log(nodes);
		});
	}
	
	getSelectedNodes(): void {
		this.selectedNodes.emit(this.nodes);
	}
}