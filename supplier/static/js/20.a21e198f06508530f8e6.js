webpackJsonp([20],{"0jM4":function(t,e,a){var s=a("u+XG");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("0a421d34",s,!0)},"u+XG":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.block[data-v-5ec71667] {\n  clear: both;\n  float: right;\n  margin-top: 10px;\n}\n",""])},yo65:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("NYxO"),r={name:"",computed:Object(s.b)(["queryUserOrderList"]),data:function(){return{inputSearchValue:"",total:0,isLoading:!1,adminInfo:""}},created:function(){sessionStorage.getItem("admin")&&(this.adminInfo=JSON.parse(sessionStorage.getItem("admin"))),this.initData()},methods:{initData:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",ts_to_OrderID:this.inputSearchValue?this.inputSearchValue.trim():"",ts_to_TouristTraderID:this.adminInfo.sm_ui_ID,page:t||1,rows:10};this.isLoading=!0,this.$store.dispatch("initQueryUserOrder",a).then(function(t){e.isLoading=!1,e.total=Number(t)},function(t){e.$notify({message:t,type:"error"})})},search:function(){this.initData()},handleCurrentChange:function(t){this.initData(t)},orderSubmit:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",orderID:t||""};this.$store.dispatch("orderTrSubmit",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("查询商户订单")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("订单号筛选:")])]),t._v(" "),a("el-form-item",[a("el-input",{staticStyle:{width:"300px"},attrs:{size:"small",placeholder:"请输入订单号"},model:{value:t.inputSearchValue,callback:function(e){t.inputSearchValue=e},expression:"inputSearchValue"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查 询")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.queryUserOrderList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:"",labelWidth:"130px"}},[a("el-form-item",{attrs:{label:"订单号:"}},[a("span",[t._v(t._s(e.row.ts_to_OrderID))])]),t._v(" "),a("el-form-item",{attrs:{label:"旅行社编码:"}},[a("span",[t._v(t._s(e.row.ts_to_TouristTraderID))])]),t._v(" "),a("el-form-item",{attrs:{label:"旅行社名称:"}},[a("span",[t._v(t._s(e.row.ts_to_TouristTraderName))])]),t._v(" "),a("el-form-item",{attrs:{label:"用户编码:"}},[a("span",[t._v(t._s(e.row.ts_to_UserID))])]),t._v(" "),a("el-form-item",{attrs:{label:"凭证码:"}},[a("span",[t._v(t._s(e.row.ts_to_Password))])]),t._v(" "),a("el-form-item",{attrs:{label:"总张数:"}},[a("span",[t._v(t._s(e.row.ts_to_TicketCount))])]),t._v(" "),a("el-form-item",{attrs:{label:"总金额:"}},[a("span",[t._v(t._s(e.row.ts_to_SumPrice)+"元")])]),t._v(" "),a("el-form-item",{attrs:{label:"全票价:"}},[a("span",[t._v(t._s(e.row.ts_to_FullPrice)+"元")])]),t._v(" "),a("el-form-item",{attrs:{label:"儿童价:"}},[a("span",[t._v(t._s(e.row.ts_to_ChildPrice)+"元")])]),t._v(" "),a("el-form-item",{attrs:{label:"总的网售手续费:"}},[a("span",[t._v(t._s(e.row.ts_to_SumService))])]),t._v(" "),a("el-form-item",{attrs:{label:"是否删除:"}},[a("span",[t._v(t._s(0==e.row.ts_to_IsDelete?"未删除":"已删除"))])]),t._v(" "),a("el-form-item",{attrs:{label:"出票状态:"}},[a("span",[t._v(t._s(t._f("getOutStatus")(e.row.ts_to_OutStatus)))])]),t._v(" "),a("el-form-item",{attrs:{label:"发起订单时间:"}},[a("span",[t._v(t._s(e.row.ts_to_CreateTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"订单支付时间:"}},[a("span",[t._v(t._s(e.row.ts_to_PayTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"支付方式:"}},[a("span",[t._v(t._s(e.row.ts_to_PayWay))])]),t._v(" "),a("el-form-item",{attrs:{label:"订单支付码:"}},[a("span",[t._v(t._s(e.row.ts_to_PayParam))])]),t._v(" "),a("el-form-item",{attrs:{label:"支付状态:"}},[a("span",[t._v(t._s(0==e.row.ts_to_PayState?"未支付":"已支付"))])]),t._v(" "),a("el-form-item",{attrs:{label:"供票方编码:"}},[a("span",[t._v(t._s(e.row.ts_to_SellID))])]),t._v(" "),a("el-form-item",{attrs:{label:"供票方名称:"}},[a("span",[t._v(t._s(e.row.ts_to_SellName))])]),t._v(" "),a("el-form-item",{attrs:{label:"备注:"}},[a("span",[t._v(t._s(e.row.ts_to_Remark))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"产品名称",prop:"ts_to_GoodsListName"}}),t._v(" "),a("el-table-column",{attrs:{label:"总金额",prop:"ts_to_SumPrice"}}),t._v(" "),a("el-table-column",{attrs:{label:"用户名称",prop:"ts_to_UserName"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.row.ts_to_OutStatus,expression:"!scope.row.ts_to_OutStatus"}],attrs:{size:"mini"},on:{click:function(a){t.orderSubmit(e.row.ts_to_OrderID)}}},[t._v("确认订单\n        ")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:1==e.row.ts_to_OutStatus,expression:"scope.row.ts_to_OutStatus==1"}]},[t._v("已出单")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(r,o,!1,function(t){a("0jM4")},"data-v-5ec71667",null);e.default=l.exports}});