declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { Func } from '../../model/func';
import { FuncService } from './func.service';

@Component({
  selector: 'func-root',
  templateUrl: './func_list.html',
})
export class FuncConfComponent extends ListBaseComponent{
	func_list: Func[];
	
	constructor(private service: FuncService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getFuncs().then(data => {
        	this.func_list = data.func_list;
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
  selector: 'func-detail-root',
  templateUrl: './func_detail.html',
})
export class FuncConfDetailComponent extends ListBaseComponent{
	func: Func;

	constructor(private service: FuncService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		let self = this;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.func = res['func'];
	        });
		console.log(this.route.params);
	}
	
	goBack(): void {
		this.router.navigate(['/func_conf']);
	}
	
	save(): void {
		this.service.update(this.func).then(res => {
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
}