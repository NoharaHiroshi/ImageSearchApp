import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { Image } from '../../model/image';
import { ImageService } from './image.service';

@Component({
  selector: 'image-root',
  templateUrl: './image_list.html',
})
export class ImageConfComponent extends ListBaseComponent{
	image_list: Image[];
	
	constructor(private service: ImageService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		/* this.service.getImages().then(data => {
        	this.image_list = data.image_list;
			this.isLoading = false;
        }); */
		
	}
}