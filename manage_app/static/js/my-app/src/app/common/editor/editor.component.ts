import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

declare var swal: any;
declare var $: any;

@Component({
    selector: 'editor',
	templateUrl: './editor.html',
})
export class EditorComponent implements OnInit {
	content: string;
	editorConfig: any;
	
	@ViewChild("editor") editor: any;
	
	constructor() {
		this.content = `<p>My html content</p>`;
	}

	ngOnInit() {
		this.editorConfig = {
			allowedContent: true,
			extraPlugins: 'divarea'
		};
	}

	onChange($event: any): void {
		console.log("onChange");

	}
}