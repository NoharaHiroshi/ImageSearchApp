declare var $: any;
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';

import { ImageTag } from '../../model/image_tag';
import { ImageAssociationTag } from '../../model/image_association_tag';

import { BaseService } from '../../common/base.service';

@Injectable()
export class ImageTagService extends BaseService {
	constructor(http: Http) { 
		super(http);
	}
	
	getImageTag(page: number): Promise<any> {
		const url = `/manage/image_tag_list?page=` + page; 
		let self = this;
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_tag_list = self.jsonListToObjectList(json.image_tag_list, ImageTag);
	           	        json['image_tag_list'] = image_tag_list;
						for(let image_tag of image_tag_list){
							let all_association_tag = self.jsonListToObjectList(image_tag['all_association_tag'], ImageAssociationTag);
							image_tag['all_association_tag'] = all_association_tag;
						}
						json['page'] = page;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getImages(page: number, tag_id: any): Promise<any> {
		let self = this;
		const url = `/manage/image_tag_list/tag_image_list?page=${page}&tag_id=${tag_id}`; 
	    return this.http.get(url)
	               .toPromise()
	               .then(function(res){
						let json = res.json();
	            	    let image_list = self.jsonListToObjectList(json.image_list, Image);
	           	        json['image_list'] = image_list;
	            	    return json;
	               })
	               .catch(this.handleError);
	}
	
	getDetail(id: String): Promise<{}> {
		const url = '/manage/image_tag_list/detail?id=' + id; 
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						json['image_tag'] = self.jsonToObject(json.image_tag, ImageTag);
						return json;
				   })
				   .catch(this.handleError);
	} 
	
	update(imageTag: ImageTag): Promise<any> {
		const url = '/manage/image_tag_list/update';
	    return this.postForm(url, JSON.stringify(imageTag));
	}
	
	del(ids: String): Promise<{}> {
		const url = '/manage/image_tag_list/delete';
		let params = {
			'ids': ids
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	removeImageFromTag(image_ids: String, tag_id: String): Promise<{}> {
		const url = '/manage/image_tag_list/remove_image_from_tag';
		let params = {
			'image_id': image_ids,
			'tag_id': tag_id
		}
		return this.postForm(url, JSON.stringify(params));
	}
	
	getAssociationTagDetail(tag_id: String): Promise<any> {
		const url = '/manage/image_tag_list/image_association_tag?tag_id=' + tag_id;
		let self = this;
		return this.http.get(url)
				   .toPromise()
				   .then(res => {
						let json = res.json()
						return json;
				   })
				   .catch(this.handleError);
	}
	
	updateAssociationTag(image_association_tag_str: string, tag_id: string): Promise<any> {
		const url = '/manage/image_tag_list/image_association_tag/update';
		let params = {
			'tag_id': tag_id,
			'image_association_tag_str': image_association_tag_str
		}
	    return this.postForm(url, JSON.stringify(params));
	}
}