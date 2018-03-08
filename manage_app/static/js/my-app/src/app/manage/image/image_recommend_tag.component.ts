declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';

import { ImageRecommendTagService } from './image_recommend_tag.service'
import { ImageRecommendTag } from '../../model/image_recommend_tag';


@Component({
  selector: 'image-recommend-tag-root',
  templateUrl: './image_recommend_tag_list.html',
})
export class ImageRecommendTagConfComponent extends ListBaseComponent{
	image_recommend_tag_list: ImageRecommendTag[];
	
	constructor(private service: ImageRecommendTagService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getRecommendImageTag().then(data => {
        	this.image_recommend_tag_list = data.image_recommend_tag_list;
			this.isLoading = false;
        });
	}
}

@Component({
  selector: 'image-recommend-tag-detail-root',
  templateUrl: './image_recommend_tag_detail.html',
})
export class ImageRecommendTagConfDetailComponent extends ListBaseComponent{
	imageRecommendTag: ImageRecommendTag;
	tag_ids: any[];
	tag_names: any[];
	
	constructor(private service: ImageRecommendTagService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.imageRecommendTag = res['image_recommend_tag'];
				this.tag_ids = res['tag_ids'];
				this.tag_names = res['tag_names'];
				setTimeout(function(){
					self.loadAfter();
				}, 200);
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/image_recommend_tag_conf']);
	}
	
	save(): void {
		this.imageRecommendTag['tag_ids'] = this.tag_ids;
		this.service.update(this.imageRecommendTag).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				console.log('fail', '保存失败');
				this.isDisabledButton = false;
			}else{
				console.log('success', '保存成功');
				this.goBack();
			}
		});
	}
	
	loadAfter(): void  {
		let self = this;
		let data_name: string;
		const url = `/lib/get_all_tags`; 
		$('#tag_select').val(self.tag_ids).select2({
            placeholder: '请选择标签',
            allowClear: true,
			multiple: true,
            ajax: {
                url: url,
                dataType: 'json',
                quietMillis: 100,
                data: function (search:any, page:any) {
                    return {
                    	search: search,
                        limit: 10,
                        page: page,
                    };
                },
                results: function (data:any, page:any) {
                    var more = (page * 10) < data.meta.total;
                    return {results: data['data_list'], more: more};
                }
            },
            initSelection: function(element:any, callback:any){
            	var data = [], 
					_tag_ids = self.tag_ids,
					_tag_names = self.tag_names;
				_tag_ids.forEach(function(_tag_id, i){
					data.push({id: _tag_id, name: _tag_names[i]});
				});
				callback(data);
            },
            formatSelection: function(data:any){
                return data.name;
            },
            formatResult: function(data:any){
            	var s = "<div style='padding: 5px;'>" + data.name + "</div>";
                return  s;
            }
        }).on('change', function(){
        	self.tag_ids = $('#tag_select').val();
        });
	}
}