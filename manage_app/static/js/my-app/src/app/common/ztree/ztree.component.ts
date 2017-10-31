import { Component, Input, Output, EventEmitter } from '@angular/core';

import 'ztree';
declare var $: any;

@Component({
    selector: 'ztree',
	templateUrl: './ztree.html'
})
export class ZtreeComponent {
	@Input() data: any;
	@Output() selectedNodes = new EventEmitter<any[]>();   
	
	nodes: any;
	
	constructor() {}
	
	ngOnInit(): void {
		// ztree对象
		let zTree: any;
		
		let self = this;
		
		let checkSelectedNodes(): void {
			self.nodes = [];
			let _nodes = zTreeObj.getCheckedNodes(true);
			for(let _node of _nodes){
				let _node_content = {
					'name': _node['name'],
					'menu_id': _node['menu_id'],
					'is_menu': _node['is_menu']
				}
				self.nodes.push(_node_content);
			}
			self.selectedNodes.emit(self.nodes);	
		}
		
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
			},
			callback: {
				onCheck: checkSelectedNodes
			}
		};
		
		let zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, this.data);
	}
}