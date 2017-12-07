declare var swal: any;
declare var $: any;

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { Image } from '../../model/image';

import { ImageService } from './image.service';

@Component({
  selector: 'image-demo',
  templateUrl: './image_demo.html'
})
export class ImageDemoConfComponent extends ListBaseComponent{
	
}