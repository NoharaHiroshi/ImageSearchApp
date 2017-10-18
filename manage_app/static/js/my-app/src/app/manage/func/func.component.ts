declare var $: any;

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
        });
		this.isLoading = false;
	}
	
	del(): void {
		let del_ids = this.selectChecked();
		this.service.del(del_ids).then(data =>{
			if(data['response'] == 'ok'){
				this.refresh();
			}
		})
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
	}
	
	goBack(): void {
		this.router.navigate(['/func_conf']);
	}
	
	save(): void {
		this.service.update(this.func).then(res => {
			this.isDisabledButton = false;
			if(res.response=='fail'){
				console.log('fail', '保存失败');
				this.isDisabledButton = true;
			}else{
				console.log('success', '保存成功');
				this.goBack();
			}
		});
	}
}