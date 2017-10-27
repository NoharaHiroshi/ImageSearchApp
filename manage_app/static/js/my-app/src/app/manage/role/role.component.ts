declare var $: any;
declare var swal: any;

import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }  from '@angular/common';

import { ListBaseComponent } from '../../common/base.component';
import { Role } from '../../model/role';
import { RoleService } from './role.service';

@Component({
  selector: 'role-root',
  templateUrl: './role_list.html',
})
export class RoleConfComponent extends ListBaseComponent{
	role_list: Role[];
	
	constructor(private service: RoleService) {
		super();
	}
	
	getPagerData(): void {
		this.isLoading = true;
		this.service.getRoles().then(data => {
        	this.role_list = data.role_list;
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
  selector: 'role-detail-root',
  templateUrl: './role_detail.html',
})
export class RoleConfDetailComponent extends ListBaseComponent{
	role: Role;
	
	constructor(private service: RoleService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		this.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.role = res['role'];
				this.isLoading = false;
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/role_conf']);
	}
	
	save(): void {
		this.service.update(this.role).then(res => {
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

@Component({
  selector: 'role-permission-detail-root',
  templateUrl: './role_permission_detail.html',
})
export class RolePermissionConfDetailComponent extends ListBaseComponent{
	
	constructor(private service: RoleService, public route: ActivatedRoute, public router: Router) {
		super();
	}
	
	ngOnInit(): void {
		this.isLoading = true;
        this.route.params.switchMap((params: Params) => this.service.getRolePermissionDetail(params['id']||'0'))
	        .subscribe(res => {
	        	this.role = res['role'];
				this.isLoading = false;
	        });
	}
	
	goBack(): void {
		this.router.navigate(['/role_conf']);
	}
	
	save(): void {
		this.service.updateRolePermission(this.role).then(res => {
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