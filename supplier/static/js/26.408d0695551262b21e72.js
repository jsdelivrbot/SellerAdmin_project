webpackJsonp([26],{"8WjG":function(n,t,e){(n.exports=e("bKW+")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},Pk1A:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("SJI6"),a={computed:Object(r.mapGetters)(["ticketQueryOrderList"]),data:function(){return{total:0,searchId:"",searchArr:[{value:0,label:"未支付"},{value:1,label:"已支付"}],userInfo:"",isLoading:!1}},methods:{handleCurrentChange:function(n){this.initData(n)},initData:function(n){var t=this;this.isLoading=!0;var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_or_UserID:"",tm_or_TradeInfoID:this.userInfo.sm_ui_ID,tm_or_PayState:this.searchId,page:n||1,rows:10};this.$store.dispatch("initTicketQueryOrder",e).then(function(n){t.total=n,t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})},search:function(){this.initData()},confirmOrder:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",orderID:n||""};this.$store.dispatch("ticketConfirmOrder",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData()},function(n){t.$notify({message:n,type:"error"})})}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.initData()}},s={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("订单信息")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("支付状态筛选:")])]),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择",size:"mini"},model:{value:n.searchId,callback:function(t){n.searchId=t},expression:"searchId"}},n._l(n.searchArr,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:n.ticketQueryOrderList}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"订单 ID"}},[e("span",[n._v(n._s(t.row.tm_or_OrderID))])]),n._v(" "),e("el-form-item",{attrs:{label:"景点编号"}},[e("span",[n._v(n._s(t.row.tm_or_TourSiteCode))])]),n._v(" "),e("el-form-item",{attrs:{label:"商户票种编号"}},[e("span",[n._v(n._s(t.row.tm_or_TicketTypeID))])]),n._v(" "),e("el-form-item",{attrs:{label:"景点商户编号"}},[e("span",[n._v(n._s(t.row.tm_or_TradeInfoID))])]),n._v(" "),e("el-form-item",{attrs:{label:"景点商户名称"}},[e("span",[n._v(n._s(t.row.tm_or_TradeInfoName))])]),n._v(" "),e("el-form-item",{attrs:{label:"凭证码"}},[e("span",[n._v(n._s(t.row.tm_or_Password))])]),n._v(" "),e("el-form-item",{attrs:{label:"总张数"}},[e("span",[n._v(n._s(t.row.tm_or_TicketCount)+"张")])]),n._v(" "),e("el-form-item",{attrs:{label:"总金额"}},[e("span",[n._v(n._s(t.row.tm_or_SumPrice)+"元")])]),n._v(" "),e("el-form-item",{attrs:{label:"总的网售手续费"}},[e("span",[n._v(n._s(t.row.tm_or_SumService)+"元")])]),n._v(" "),e("el-form-item",{attrs:{label:"出票状态"}},[e("span",[n._v(n._s(t.row.tm_or_OutStatus))])]),n._v(" "),e("el-form-item",{attrs:{label:"使用状态"}},[e("span",[n._v(n._s(t.row.tm_or_UseState))])]),n._v(" "),e("el-form-item",{attrs:{label:"失败编号"}},[e("span",[n._v(n._s(t.row.tm_or_FailID))])]),n._v(" "),e("el-form-item",{attrs:{label:"失败原因"}},[e("span",[n._v(n._s(t.row.tm_or_FailContent))])]),n._v(" "),e("el-form-item",{attrs:{label:"分销商编码"}},[e("span",[n._v(n._s(t.row.tm_or_SellID))])]),n._v(" "),e("el-form-item",{attrs:{label:"分销商名称"}},[e("span",[n._v(n._s(t.row.tm_or_SellName))])]),n._v(" "),e("el-form-item",{attrs:{label:"全票价"}},[e("span",[n._v(n._s(t.row.tm_or_FullPrice)+"元")])]),n._v(" "),e("el-form-item",{attrs:{label:"儿童价"}},[e("span",[n._v(n._s(t.row.tm_or_ChildPrice)+"元")])]),n._v(" "),e("el-form-item",{attrs:{label:"发起订单时间"}},[e("span",[n._v(n._s(t.row.tm_or_CreateTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单支付时间"}},[e("span",[n._v(n._s(t.row.tm_or_PayTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付方式"}},[e("span",[n._v(n._s(t.row.tm_or_PayWay))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单支付码"}},[e("span",[n._v(n._s(t.row.tm_or_PayParam))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付状态"}},[e("span",[n._v(n._s(t.row.tm_or_PayState))])]),n._v(" "),e("el-form-item",{attrs:{label:"是否结算"}},[e("span",[n._v(n._s(t.row.tm_or_IsBalance))])]),n._v(" "),e("el-form-item",{attrs:{label:"使用时间"}},[e("span",[n._v(n._s(t.row.tm_or_UseTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"用户编码"}},[e("span",[n._v(n._s(t.row.tm_or_UserID))])]),n._v(" "),e("el-form-item",{attrs:{label:"备注"}},[e("span",[n._v(n._s(t.row.tm_or_Remark))])]),n._v(" "),e("el-form-item",{attrs:{label:"邮箱"}},[e("span",[n._v(n._s(t.row.tm_or_Email))])]),n._v(" "),e("el-form-item",{attrs:{label:"手机号"}},[e("span",[n._v(n._s(t.row.tm_or_TelePhone))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单名称"}},[e("span",[n._v(n._s(t.row.tm_or_GoodsListName))])]),n._v(" "),e("el-form-item",{attrs:{label:"联系人"}},[e("span",[n._v(n._s(t.row.tm_or_ConnectName))])]),n._v(" "),e("el-form-item",{attrs:{label:"出游日期"}},[e("span",[n._v(n._s(t.row.tm_or_TravelDate))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"联系人",prop:"tm_or_ConnectName"}}),n._v(" "),e("el-table-column",{attrs:{label:"手机号",prop:"tm_or_TelePhone"}}),n._v(" "),e("el-table-column",{attrs:{label:"出游日期",prop:"tm_or_TravelDate"}}),n._v(" "),e("el-table-column",{attrs:{label:"出票状态",prop:"tm_or_OutStatus"}}),n._v(" "),e("el-table-column",{attrs:{label:"支付状态",prop:"tm_or_PayState"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{directives:[{name:"show",rawName:"v-show",value:"已出票"!=t.row.tm_or_OutStatus,expression:"scope.row.tm_or_OutStatus != '已出票'"}],attrs:{type:"success",size:"mini"},on:{click:function(e){n.confirmOrder(t.row.tm_or_OrderID)}}},[n._v("确认订单并出单")]),n._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:"已出票"==t.row.tm_or_OutStatus,expression:"scope.row.tm_or_OutStatus == '已出票'"}]},[n._v("已出单")])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":10,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var o=e("XAIM")(a,s,!1,function(n){e("WU26")},"data-v-49194216",null);t.default=o.exports},WU26:function(n,t,e){var r=e("8WjG");"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);e("6imX")("8b25e6da",r,!0)}});