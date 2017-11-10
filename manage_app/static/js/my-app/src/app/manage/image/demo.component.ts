import { Component } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'simple-demo',
  templateUrl: './demo.html',
})
export class SimpleDemoComponent {
	uploader:FileUploader = new FileUploader({    
		url: "http://127.0.0.1:8888/uploadFile",   
		method: "POST",    
		itemAlias: "uploadedfile"
	});
	
	selectedFileOnChanged() {
		// 这里是文件选择完成后的操作处理
		console.log(event.target.value);
	}

}