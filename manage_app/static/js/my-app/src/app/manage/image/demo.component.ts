import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

@Component({
  selector: 'simple-demo',
  templateUrl: './demo.html',
})
export class SimpleDemoComponent extends ListBaseComponent{
	uploader: FileUploader = new FileUploader({    
		url: "http://127.0.0.1:8888/uploadFile",   
		method: "POST",    
		itemAlias: "uploadedfile"
	});

}