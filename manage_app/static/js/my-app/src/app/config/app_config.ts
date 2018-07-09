import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { User } from '../model/user';

@Injectable()
export class AppConfig {
	name = '测试项目';
    version = '1.0.0';
	
	// 当前Module
	module: any;
	
	// 当前用户信息
	user: User;
	// 存储临时跳转路由
	tmp_url: string = '/';
	
	// 图片上传服务器
	resource_url: string = 'http://127.0.0.1:8888';
	
	// 文本编辑框设置
	ckeditor_config: any = {
		image_previewText : '',
		filebrowserImageUploadUrl : "/lib/editor/upload_image",
		toolbar:[
				{ name: 'document', items: [ 'Source', '-', 'Preview'] },
				{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ] },
				{ name: 'editing', items: [ 'Find', 'Replace'] },
				{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
				{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
				{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
				{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'Iframe' ] },
				{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
				{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
				{ name: 'tools', items: [ 'Maximize'] },
			]
	}
}