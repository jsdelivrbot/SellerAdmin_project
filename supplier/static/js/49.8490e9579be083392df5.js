webpackJsonp([49],{"59UH":function(n,r,e){var t=e("Kn71");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);e("rjj0")("265fae36",t,!0)},Kn71:function(n,r,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},nvzy:function(n,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("NYxO"),a={name:"",data:function(){return{orderID:"",total:0,isLoading:!1,traderID:""}},computed:Object(t.b)(["carOrderDetailsList"]),created:function(){this.traderID=JSON.parse(sessionStorage.getItem("admin")).sm_ai_AgentID,this.initData("",1)},methods:{getSummaries:function(n){var r=n.columns,e=n.data,t=[];return r.forEach(function(n,r){if(0!==r){var a=e.map(function(r){return Number(r[n.property])});a.every(function(n){return isNaN(n)})?t[r]="N/A":(t[r]=a.reduce(function(n,r){var e=Number(r);return isNaN(e)?parseInt(n):parseInt(n+r)},0),t[r]+=" 元")}else t[r]="总价"}),t},handleCurrentChange:function(n){this.initData(this.orderID,n)},search:function(){this.initData(this.orderID,1)},initData:function(n,r){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",page:r||1,rows:"20",cr_cro_Id:"",cr_cro_OrderId:n||"",cr_cro_UserCode:"",cr_cro_PassWord:"",cr_cro_AgentId:this.traderID};this.isLoading=!0,this.$store.dispatch("initCarOrderDetails",t).then(function(n){e.total=n,e.isLoading=!1},function(n){e.$notify({message:n,type:"error"})})}}},s={render:function(){var n=this,r=n.$createElement,e=n._self._c||r;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("租车订单明细")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("订单号筛选:")])]),n._v(" "),e("el-form-item",[e("el-input",{staticStyle:{width:"250px"},attrs:{type:"text","auto-complete":"off",placeholder:"订单号",size:"small"},model:{value:n.orderID,callback:function(r){n.orderID=r},expression:"orderID"}})],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:n.carOrderDetailsList,border:"","summary-method":n.getSummaries,"show-summary":"",size:"small"}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(r){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"订单编号:"}},[e("span",[n._v(n._s(r.row.cr_cro_Id))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单号:"}},[e("span",[n._v(n._s(r.row.cr_cro_OrderId))])]),n._v(" "),e("el-form-item",{attrs:{label:"用户名称:"}},[e("span",[n._v(n._s(r.row.cr_cro_UserName))])]),n._v(" "),e("el-form-item",{attrs:{label:"凭证码:"}},[e("span",[n._v(n._s(r.row.cr_cro_PassWord))])]),n._v(" "),e("el-form-item",{attrs:{label:"公司汽车名称:"}},[e("span",[n._v(n._s(r.row.cr_cro_CarName))])]),n._v(" "),e("el-form-item",{attrs:{label:"取车门店:"}},[e("span",[n._v(n._s(r.row.cr_cro_TakeStoreId))])]),n._v(" "),e("el-form-item",{attrs:{label:"还车门店:"}},[e("span",[n._v(n._s(r.row.cr_cro_GiveBackStoreId))])]),n._v(" "),e("el-form-item",{attrs:{label:"供应商名称:"}},[e("span",[n._v(n._s(r.row.cr_cro_AgentName))])]),n._v(" "),e("el-form-item",{attrs:{label:"驾驶员名称:"}},[e("span",[n._v(n._s(r.row.cr_cro_DriverName))])]),n._v(" "),e("el-form-item",{attrs:{label:"证件类型:"}},[e("span",[n._v(n._s(n._f("getIDType")(r.row.cr_cro_IDType)))])]),n._v(" "),e("el-form-item",{attrs:{label:"证件号:"}},[e("span",[n._v(n._s(r.row.cr_cro_IDCode))])]),n._v(" "),e("el-form-item",{attrs:{label:"手机号:"}},[e("span",[n._v(n._s(r.row.cr_cro_Phone))])]),n._v(" "),e("el-form-item",{attrs:{label:"车型名称:"}},[e("span",[n._v(n._s(r.row.cr_cro_CarName))])]),n._v(" "),e("el-form-item",{attrs:{label:"租车费用:"}},[e("span",[n._v(n._s(r.row.cr_cro_CarRentalFee))])]),n._v(" "),e("el-form-item",{attrs:{label:"手续费:"}},[e("span",[n._v(n._s(r.row.cr_cro_ServiceCharge))])]),n._v(" "),e("el-form-item",{attrs:{label:"保险费:"}},[e("span",[n._v(n._s(r.row.cr_cro_Insurance))])]),n._v(" "),e("el-form-item",{attrs:{label:"总价格:"}},[e("span",[n._v(n._s(r.row.cr_cro_TotalPrice))])]),n._v(" "),e("el-form-item",{attrs:{label:"不计免赔:"}},[e("span",[n._v(n._s(r.row.cr_cro_DeductibleInsurance))])]),n._v(" "),e("el-form-item",{attrs:{label:"第三方责任险:"}},[e("span",[n._v(n._s(r.row.cr_cro_ThirdPartyInsurance))])]),n._v(" "),e("el-form-item",{attrs:{label:"取车时间:"}},[e("span",[n._v(n._s(r.row.cr_cro_GetTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"还车时间:"}},[e("span",[n._v(n._s(r.row.cr_cro_BackTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"第三方责任险:"}},[e("span",[n._v(n._s(r.row.cr_cro_ThirdPartyInsurance))])]),n._v(" "),e("el-form-item",{attrs:{label:"出单状态:"}},[e("span",[n._v(n._s(n._f("getOutStatus")(r.row.cr_cro_OutStatus)))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付状态:"}},[e("span",[n._v(n._s(n._f("payStatus")(r.row.cr_cro_PlayStatus)))])]),n._v(" "),e("el-form-item",{attrs:{label:"使用状态:"}},[e("span",[n._v(n._s(n._f("useStatus")(r.row.cr_cro_UseStatus)))])]),n._v(" "),e("el-form-item",{attrs:{label:"创建时间:"}},[e("span",[n._v(n._s(r.row.cr_cro_CreateTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付时间:"}},[e("span",[n._v(n._s(r.row.cr_cro_PlayTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付方式:"}},[e("span",[n._v(n._s(r.row.cr_cro_PlayType))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_cro_Id",label:"订单编号",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_cro_OrderId",label:"订单号",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_cro_AgentName",label:"租车公司名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_cro_TotalPrice",label:"总价格(元)",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"cr_cro_ServiceCharge",label:"手续费(元)",align:"center"}})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":20,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var o=e("VU/8")(a,s,!1,function(n){e("59UH")},"data-v-2343abe1",null);r.default=o.exports}});