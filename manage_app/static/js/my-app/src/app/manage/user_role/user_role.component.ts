declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { UserRole } from '../../model/user_role';
import { UserRoleService } from './user_role.service';

@Component({
  selector: 'user-role-root',
  templateUrl: './user_role_list.html',
})
export class UserRoleConfComponent extends ListBaseComponent{
	user_role_list: UserRole[];
	
	constructor(private service: UserRoleService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getUserRoles().then(data => {
        	this.user_role_list = data.user_role_list;
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
  selector: 'user-role-detail-root',
  templateUrl: './user_role_detail.html',
})
export class UserRoleConfDetailComponent extends ListBaseComponent{
	isAdd: boolean = false;
	
	user_role: UserRole;
	all_role_info: any;
	all_user_info: any;
	
	constructor(private service: UserRoleService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		this.isLoading = true;
		// 判断是添加还是修改
		if(undefined == this.route.params.value.id){
			this.isAdd = true;
		}
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.user_role = res['user_role'];
				this.all_role_info = res['all_role_info'];
				this.all_user_info = res['all_user_info'];
				this.isLoading = false;
				let self = this;
				setTimeout(function(){
					if(undefined != self.user_role.roles){
						for(let role of self.user_role.roles){
							let _id = role['id'];
							$('#' + _id).attr('checked', true);
						}
					}
				}, 100);
	        });
	}
	
	goBack(): void {
		this.router.navigate(['../..'], {relativeTo: this.route});
	}
	
	save(): void {
		let obj_list = [];
		let objs = $('input[name="checked"]:checked');
		for(let obj of objs){
			obj_list.push(obj.value);
		}
		let role_ids = obj_list.join(',');
		this.user_role.roles = role_ids;
		this.user_role['is_add'] = this.isAdd;
		this.service.update(this.user_role).then(res => {
			this.isDisabledButton = true;
			if(res.response=='fail'){
				swal('保存失败', res.info);
				this.isDisabledButton = false;
			}else{
				swal('保存成功');
				this.goBack();
			}
		});
	}
}