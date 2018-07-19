webpackJsonp([53],{LhFn:function(n,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("NYxO"),a={name:"",data:function(){return{orderID:"",traderID:"",total:0,hotelID:"",isLoading:!1}},computed:Object(t.b)(["carOrderDetailsList"]),created:function(){this.traderID=JSON.parse(sessionStorage.getItem("admin")).sm_ai_AgentID,this.initData("",1)},methods:{getSummaries:function(n){var e=n.columns,r=n.data,t=[];return e.forEach(function(n,e){if(0!==e){var a=r.map(function(e){return Number(e[n.property])});a.every(function(n){return isNaN(n)})?t[e]="N/A":(t[e]=a.reduce(function(n,e){var r=Number(e);return isNaN(r)?parseInt(n):parseInt(n+e)},0),t[e]+=" 元")}else t[e]="总价"}),t},handleCurrentChange:function(n){this.initData(this.orderID,n)},initData:function(n,e){var r=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",page:e||1,rows:"20",cr_cro_Id:"",cr_cro_OrderId:n||"",cr_cro_UserCode:"",cr_cro_PassWord:"",cr_cro_AgentId:this.traderID};this.isLoading=!0,this.$store.dispatch("initCarOrderDetails",t).then(function(n){r.total=n,r.isLoading=!1},function(n){r.$notify({message:n,type:"error"})})},confirmOrder:function(n){var e=this,r={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",OrderId:n};this.$store.dispatch("CarConfirmOrder",r).then(function(n){e.$notify({message:n,type:"success"}),e.initData("",1)},function(n){e.$notify({message:n,type:"error"})})},search:function(){this.initData(this.orderID,1)}}},s={render:function(){var n=this,e=n.$createElement,r=n._self._c||e;return r("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[r("h1",{staticClass:"userClass"},[n._v("租车确认订单")]),n._v(" "),r("el-col",{staticClass:"formSearch",attrs:{span:24}},[r("el-form",{attrs:{inline:!0}},[r("el-form-item",[r("span",[n._v("订单号筛选:")])]),n._v(" "),r("el-form-item",[r("el-input",{staticStyle:{width:"250px"},attrs:{type:"text","auto-complete":"off",placeholder:"订单号",size:"small"},model:{value:n.orderID,callback:function(e){n.orderID=e},expression:"orderID"}})],1),n._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:n.carOrderDetailsList,border:"","summary-method":n.getSummaries,"show-summary":"",size:"small"}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(e){return[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:"订单编号:"}},[r("span",[n._v(n._s(e.row.cr_cro_Id))])]),n._v(" "),r("el-form-item",{attrs:{label:"订单号:"}},[r("span",[n._v(n._s(e.row.cr_cro_OrderId))])]),n._v(" "),r("el-form-item",{attrs:{label:"用户名称:"}},[r("span",[n._v(n._s(e.row.cr_cro_UserName))])]),n._v(" "),r("el-form-item",{attrs:{label:"凭证码:"}},[r("span",[n._v(n._s(e.row.cr_cro_PassWord))])]),n._v(" "),r("el-form-item",{attrs:{label:"公司汽车名称:"}},[r("span",[n._v(n._s(e.row.cr_cro_CarName))])]),n._v(" "),r("el-form-item",{attrs:{label:"取车门店:"}},[r("span",[n._v(n._s(e.row.cr_cro_TakeStoreId))])]),n._v(" "),r("el-form-item",{attrs:{label:"还车门店:"}},[r("span",[n._v(n._s(e.row.cr_cro_GiveBackStoreId))])]),n._v(" "),r("el-form-item",{attrs:{label:"供应商名称:"}},[r("span",[n._v(n._s(e.row.cr_cro_AgentName))])]),n._v(" "),r("el-form-item",{attrs:{label:"驾驶员名称:"}},[r("span",[n._v(n._s(e.row.cr_cro_DriverName))])]),n._v(" "),r("el-form-item",{attrs:{label:"证件类型:"}},[r("span",[n._v(n._s(n._f("getIDType")(e.row.cr_cro_IDType)))])]),n._v(" "),r("el-form-item",{attrs:{label:"证件号:"}},[r("span",[n._v(n._s(e.row.cr_cro_IDCode))])]),n._v(" "),r("el-form-item",{attrs:{label:"手机号:"}},[r("span",[n._v(n._s(e.row.cr_cro_Phone))])]),n._v(" "),r("el-form-item",{attrs:{label:"车型名称:"}},[r("span",[n._v(n._s(e.row.cr_cro_CarName))])]),n._v(" "),r("el-form-item",{attrs:{label:"租车费用:"}},[r("span",[n._v(n._s(e.row.cr_cro_CarRentalFee))])]),n._v(" "),r("el-form-item",{attrs:{label:"手续费:"}},[r("span",[n._v(n._s(e.row.cr_cro_ServiceCharge))])]),n._v(" "),r("el-form-item",{attrs:{label:"保险费:"}},[r("span",[n._v(n._s(e.row.cr_cro_Insurance))])]),n._v(" "),r("el-form-item",{attrs:{label:"总价格:"}},[r("span",[n._v(n._s(e.row.cr_cro_TotalPrice))])]),n._v(" "),r("el-form-item",{attrs:{label:"不计免赔:"}},[r("span",[n._v(n._s(e.row.cr_cro_DeductibleInsurance))])]),n._v(" "),r("el-form-item",{attrs:{label:"第三方责任险:"}},[r("span",[n._v(n._s(e.row.cr_cro_ThirdPartyInsurance))])]),n._v(" "),r("el-form-item",{attrs:{label:"取车时间:"}},[r("span",[n._v(n._s(e.row.cr_cro_GetTime))])]),n._v(" "),r("el-form-item",{attrs:{label:"还车时间:"}},[r("span",[n._v(n._s(e.row.cr_cro_BackTime))])]),n._v(" "),r("el-form-item",{attrs:{label:"第三方责任险:"}},[r("span",[n._v(n._s(e.row.cr_cro_ThirdPartyInsurance))])]),n._v(" "),r("el-form-item",{attrs:{label:"出单状态:"}},[r("span",[n._v(n._s(n._f("getOutStatus")(e.row.cr_cro_OutStatus)))])]),n._v(" "),r("el-form-item",{attrs:{label:"支付状态:"}},[r("span",[n._v(n._s(n._f("payStatus")(e.row.cr_cro_PlayStatus)))])]),n._v(" "),r("el-form-item",{attrs:{label:"使用状态:"}},[r("span",[n._v(n._s(n._f("useStatus")(e.row.cr_cro_UseStatus)))])]),n._v(" "),r("el-form-item",{attrs:{label:"创建时间:"}},[r("span",[n._v(n._s(e.row.cr_cro_CreateTime))])]),n._v(" "),r("el-form-item",{attrs:{label:"支付时间:"}},[r("span",[n._v(n._s(e.row.cr_cro_PlayTime))])]),n._v(" "),r("el-form-item",{attrs:{label:"支付方式:"}},[r("span",[n._v(n._s(e.row.cr_cro_PlayType))])])],1)]}}])}),n._v(" "),r("el-table-column",{attrs:{prop:"cr_cro_OrderId",label:"订单号",align:"center"}}),n._v(" "),r("el-table-column",{attrs:{prop:"cr_cro_AgentName",label:"租车公司名称",align:"center"}}),n._v(" "),r("el-table-column",{attrs:{prop:"cr_cro_TotalPrice",label:"总价格(元)",align:"center"}}),n._v(" "),r("el-table-column",{attrs:{prop:"cr_cro_ServiceCharge",label:"手续费(元)",align:"center"}}),n._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[1!=e.row.cr_cro_OutStatus?r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(r){n.confirmOrder(e.row.cr_cro_Id)}}},[n._v("确认订单\n        ")]):r("span",{staticStyle:{"font-weight":"bold"}},[n._v("已出单")])]}}])})],1),n._v(" "),r("div",{staticClass:"block",staticStyle:{float:"right"}},[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":20,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var o=r("VU/8")(a,s,!1,function(n){r("sokc")},"data-v-0e5a6ff8",null);e.default=o.exports},mZO4:function(n,e,r){(n.exports=r("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},sokc:function(n,e,r){var t=r("mZO4");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);r("rjj0")("4e65be95",t,!0)}});