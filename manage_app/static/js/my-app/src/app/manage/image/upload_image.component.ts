import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

@Component({
  selector: 'upload-image',
  templateUrl: './upload_image.html',
})
export class ImageUploadComponent extends ListBaseComponent{
	
	public uploader: FileUploader = new FileUploader({
		url: "http://127.0.0.1:8888/manage/upload_image",
		itemAlias: "uploadedfile"
	});
	public hasBaseDropZoneOver:boolean = false;
	public hasAnotherDropZoneOver:boolean = false;

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	public fileOverAnother(e:any):void {
		this.hasAnotherDropZoneOver = e;
	}
}