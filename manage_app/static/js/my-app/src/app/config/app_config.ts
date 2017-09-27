import { Injectable } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';


@Injectable()
export class AppConfig {
	name = '爱线下';
    version = '2.2.0';
    // for chart colors
    color = {
      primary: '#7266ba',
      info:    '#23b7e5',
      success: '#27c24c',
      warning: '#fad733',
      danger:  '#f05050',
      light:   '#e8eff0',
      dark:    '#3a3f51',
      black:   '#1c2b36'
    };
    settings = {
      themeID: 1,
      navbarHeaderColor: 'bg-black',
      navbarCollapseColor: 'bg-white-only',
      asideColor: 'bg-dark',
      headerFixed: true,
      asideFixed: false,
      asideFolded: false,
      asideDock: false,
      container: false
    };
    project_id = '';
    project_type = '';
    module = '';
    
    initProject():void{
    	this.project_id = $("#app").attr('pid');
    	this.module = $("#app").attr('module');
    	this.project_type = $("#app").attr('project_type');
    }
    
    isSingleProject():boolean{
    	if(this.project_type == '0' || this.project_type == '1'){
    		return true;
    	}
    	
    	return false;
    }
    
    curUser:any;
    customer_status_list = [
                   {name: "正常", value: 0 },
                   {name: "冻结", value: 1 }
               ];
    
    customer_source_list = [
       {name: "微信",   value: 0},
       {name: "二维码", value: 1},
       {name: "WIFI", value: 2},
       {name: "网站", value: 3},
       {name: "会员卡", value: 4, },
       {name: "管理后台添加", value: 5},
       {name: "第三方系统", value: 6 },
       {name: "摇一摇", value: 7 },
       {name: "停车缴费", value: 8 },
       {name: "后台导入", value: 9 }
    ];
    
    user_status_list = [
            {name: "正常", value: 1 },
            {name: "关闭",   value: 0 }
    ];
    
    project_status_list = [
                        {name: "关闭", value: 0 },
                        {name: "正常", value: 1 },
                        {name: "冻结", value: 2 },
                     ];
    project_type_list = [
                           {name: "单项目单业态", value: 0 },
                           {name: "单项目多业态", value: 1 },
                           {name: "集团单业态", value: 2 },
                           {name: "集团多业态", value: 3 },
                        ];

    project_class_list = [
                         {name: "其它", value: 0 },
                         {name: "超市", value: 1 },
                         {name: "餐饮", value: 2 },
                         {name: "商场", value: 3 },
                      ];
    
    project_pay_mode_list = [
                         {name: "爱线下账户", value: 1 },
                         {name: "甲方账户", value: 2 },
                      ];
    
    merchant_status_list = [
                           {name: "正常", value: 0},
                           {name: "关闭", value: 1},
                           {name: "隐藏", value: 2},
                       ];
    
    level_list = [
                            {name: "等级1", value: 0},
                            {name: "等级2", value: 1},
                            {name: "等级3", value: 2},
                            {name: "等级4", value: 3},
                            {name: "等级5", value: 4},
                            {name: "等级6", value: 5},
                            {name: "等级7", value: 6},
                            {name: "等级8", value: 7},
                        ];
    
    points_zero_clearing_rule_list = [
                  {name: "不清零", value: 0},
                  {name: "按财年清零", value: 1},
                  {name: "按滚动年清零", value: 2}                
              ];
    
    upgrade_time = [
                  {name: "当天", value: 0},
                  {name: "本财年", value: 1},
                  {name: "办卡之日起", value: 2},
                  {name: "当月", value: 3}                 
              ];
    upgrade_condition = [
                    {name: "积分大于等于多少", value: 0},
                    {name: "消费金额大于等于多少", value: 1},               
                ];
    degrade_time = [
                    {name: "本财年", value: 0},
                    {name: "滚动1年", value: 1},            
                ];
    degrade_condition = [
                      {name: "积分小于多少", value: 0},
                      {name: "消费金额小于多少", value: 1},               
                  ];
    

    relation_list = [
                         {name: "并且", value: 0},
                         {name: "或者", value: 1},               
                     ];

    receipt_point_type_list = [
                               {name: "扫一扫", value: 0},
                               {name: "拍照上传", value: 1},
                               {name: "手动填写", value: 2},
                               {name: "使用黑盒扫一扫", value: 3},
                               {name: "第三方系统", value: 4},
                               {name: "微信扫码积分", value: 5},
                           ];
    receipt_point_status_list = [
                                 {name: "顾客上传后等待处理", value: 0},
                                 {name: "服务员创建后等待处理", value: 1},
                                 {name: "处理完毕", value: 2},
                                 {name: "处理失败", value: 3},
                                 {name: "订单撤销", value: 4},
                             ];
    
    weixin_template_type_list = [
								{name: "积分变动提醒", value: 0},
								{name: "积分过期", value: 1},
                                 ];
    
    goods_type_list = [
  								{name: "礼券", value: 0},
  								{name: "实物", value: 1},  								
                                   ];
    trading_order_status_list = [
 								{name: "新下单", value: 0},
 								{name: "待付款", value: 1},
 								{name: "已支付", value: 2},
 								{name: "已失效", value: 3},
 								{name: "支付失败", value: 4},
 								{name: "订单取消", value: 5},
                                  ];
    trading_detail_order_status_list = [
  								{name: "待付款", value: 0},
  								{name: "未领取", value: 1},
  								{name: "已领取", value: 2},
  								{name: "退货审核中", value: 3},
  								{name: "退款审核中", value: 4},
  								{name: "退款中", value: 5},
  								{name: "已退款", value: 6},
  								{name: "逾期未领", value: 7},
  								{name: "待发货", value: 8},
  								//{name: "包含优惠券的订单退款审核", value: 9},
  								{name: "已同步到车场", value: 10},
  								{name: "同步到车场失败", value: 11},
  								{name: "正同车场通讯中", value: 12},
  								
                                   ];
    
    channel_type_list = [
                  {name: "闪购频道", value: 0},
                  {name: "活动频道", value: 1},
                  {name: "预约频道", value: 2},
                  {name: "链接频道", value: 3},
                  {name: "优惠券频道", value: 4},
                  {name: "活动报名频道", value: 5},
                  {name: "Wifi定制频道", value: 6},
                  {name: "店铺频道", value: 7},
                  {name: "团购频道", value: 8},
              ];
    ueditor_config: any = {
    		toolbars: [[
                'fullscreen', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', '|', 'forecolor', 'backcolor', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'paragraph', 'fontfamily', 'fontsize', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'link', 'unlink', '|', 
                'simpleupload', 'emotion', 'insertvideo', 'map', '|',
                'horizontal', 'spechars', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                'drafts'
            ]],
    		initialFrameHeight:320,
    		initialFrameWidth: null
        };
    public toasterconfig : ToasterConfig = 
        new ToasterConfig({
            showCloseButton: false, 
            tapToDismiss: false, 
            limit: 5,
            timeout: 2000
        });
    
    //列表数据是否显示机构一列
    has_org_col = false;
}