declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { HotSearch } from '../../model/hot_search';
import { HotSearchService } from './hot_search.service';


@Component({
  selector: 'hot-search-root',
  templateUrl: './hot_search_list.html',
})
export class HotSearchConfComponent extends ListBaseComponent{
	hot_search_list: HotSearch[];
	
	constructor(private service: HotSearchService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getHotSearch().then(data => {
        	this.hot_search_list = data.hot_search_list;
			this.isLoading = false;
        });
	}
	
	del(): void {
		let del_ids = this.selectChecked();
		let self = this;
		swal({
			title: '删除',
			text: '确定删除当前数据？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '删除',
			cancelButtonText: '取消',
			confirmButtonClass: 'btn btn-theme04 margin-right10',
			cancelButtonClass: 'btn btn-theme03',
			buttonsStyling: false
		}).then(function(isConfirm: boolean) {
			if(isConfirm === true){
				self.service.del(del_ids).then(data =>{
					if(data['response'] == 'ok'){
						swal('已删除');
						self.refresh();
					}else{
						swal('删除失败', data['info']);
						self.refresh();
					}
				})
			}else if (isConfirm === false){
				self.refresh();
			}else{
				self.refresh();
			}
		});
	}
}

@Component({
  selector: 'hot-search-detail-root',
  templateUrl: './hot_search_detail.html',
})
export class HotSearchConfDetailComponent extends ListBaseComponent{
	hot_search: HotSearch;
	all_series_list: any;
	
	constructor(private service: HotSearchService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.hot_search = res['hot_search'];
				this.all_series_list = res['all_series'];
				setTimeout(function(){
					self.loadAfter();
				}, 200);
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		this.service.update(this.hot_search).then(res => {
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
		console.log('loadAfter');
		console.log(typeof(this.hot_search.connect_id));
		let self = this;
		const url = `/lib/get_all_series`; 
		$('#series_select').val(self.hot_search.connect_id).select2({
            placeholder: '请选择专题',
            allowClear: true,
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
            	var data = [], _series_id = self.hot_search.connect_id;
                if(undefined !== _series_id){
                    var _series = self.all_series_list;
                    for(var i = 0; i < _series.length; i++) {
                    	data.push({id: _series[i].id, name: _series[i].name})
                    }
					console.log(data);
                    callback(data);
                }
            },
            formatSelection: function(data:any){
                return data.name;
            },
            formatResult: function(data:any){
            	var s = "<div style='padding: 5px;'>" + data.name + "</div>";
                return  s;
            }
        }).on('change', function(){
        	self.hot_search.connect_id = $('#series_select').val()
        });
	}
}