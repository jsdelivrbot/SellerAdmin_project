webpackJsonp([28],{XJTP:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("SJI6"),r={computed:Object(a.mapGetters)(["foodStoreConfirnOrderList"]),data:function(){return{isLoading:!1,userInfo:{},payState:[{value:0,label:"未支付"},{value:1,label:"已支付"}],outStatus:[{value:0,label:"未出票"},{value:1,label:"已出票"}],outStatusId:"",payStateId:"",total:0}},methods:{handleCurrentChange:function(n){this.initData(this.outStatusId,this.payStateId,n)},initData:function(n,e,t){var a=this,r={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_or_OrderID:"",fd_or_UserID:"",fd_or_UserName:"",priceFrom:"",priceTo:"",fd_or_TouristTraderID:this.userInfo.sm_ui_ID,fd_or_Password:"",fd_or_OutStatus:n,fd_or_Phone:"",useTimeFrom:"",useTimeTo:"",createTimeFrom:"",createTimeTo:"",payTimeFrom:"",payTimeTo:"",fd_or_PayWay:"",fd_or_PayState:e,fd_or_UseState:"",fd_or_IsDelete:"",rows:5,page:t||1};this.isLoading=!0,this.$store.dispatch("initFoodStoreConfirnOrder",r).then(function(n){a.isLoading=!1,a.total=n},function(n){a.$notify({message:n,type:"error"})})},search:function(){this.initData(this.outStatusId,this.payStateId)},orderOk:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",orderID:n||""};this.$store.dispatch("foodOrderOk",t).then(function(n){e.$notify({message:n,type:"success"}),e.initData(e.outStatusId,e.payStateId)},function(n){e.$notify({message:n,type:"error"})})},Delete:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"2",operateUserName:"",pcName:"",orderID:n||""};this.$store.dispatch("deleteFoodStoreConfirnOrder",t).then(function(n){e.$notify({message:n,type:"success"}),e.initData()},function(n){e.$notify({message:n,type:"error"})})}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.initData()}},o={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("订单管理")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",[t("span",[n._v("选择筛选:")])]),n._v(" "),t("el-form-item",[t("el-select",{attrs:{placeholder:"请选择出票状态",size:"small"},model:{value:n.outStatusId,callback:function(e){n.outStatusId=e},expression:"outStatusId"}},n._l(n.outStatus,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",[t("el-select",{attrs:{placeholder:"请选择支付状态",size:"small"},model:{value:n.payStateId,callback:function(e){n.payStateId=e},expression:"payStateId"}},n._l(n.payState,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.foodStoreConfirnOrderList}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[t("el-form-item",{attrs:{label:"用户编码:"}},[t("span",[n._v(n._s(e.row.fd_or_UserID))])]),n._v(" "),t("el-form-item",{attrs:{label:"用户名称:"}},[t("span",[n._v(n._s(e.row.fd_or_UserName))])]),n._v(" "),t("el-form-item",{attrs:{label:"手机号:"}},[t("span",[n._v(n._s(e.row.fd_or_Phone))])]),n._v(" "),t("el-form-item",{attrs:{label:"总价格:"}},[t("span",[n._v(n._s(e.row.fd_or_SumPrice)+"元")])]),n._v(" "),t("el-form-item",{attrs:{label:"提前提醒时间:"}},[t("span",[n._v(n._s(e.row.fd_or_BeforeNotice))])]),n._v(" "),t("el-form-item",{attrs:{label:"创建时间:"}},[t("span",[n._v(n._s(e.row.fd_or_CreateTime))])]),n._v(" "),t("el-form-item",{attrs:{label:"订单编码:"}},[t("span",[n._v(n._s(e.row.fd_or_OrderID))])]),n._v(" "),t("el-form-item",{attrs:{label:"出票状态:"}},[t("span",[n._v(n._s(n._f("getOutStatus")(e.row.fd_or_OutStatus)))])]),n._v(" "),t("el-form-item",{attrs:{label:"凭证码:"}},[t("span",[n._v(n._s(e.row.fd_or_Password))])]),n._v(" "),t("el-form-item",{attrs:{label:"订单状态:"}},[t("span",[n._v(n._s(n._f("payStatus")(e.row.fd_or_PayState)))])]),n._v(" "),t("el-form-item",{attrs:{label:"支付时间:"}},[t("span",[n._v(n._s(e.row.fd_or_PayTime))])]),n._v(" "),t("el-form-item",{attrs:{label:"支付方式:"}},[t("span",[n._v(n._s(e.row.fd_or_PayWay))])]),n._v(" "),t("el-form-item",{attrs:{label:"使用状态:"}},[t("span",[n._v(n._s(n._f("useStatus")(e.row.fd_or_UseState)))])]),n._v(" "),t("el-form-item",{attrs:{label:"使用时间:"}},[t("span",[n._v(n._s(e.row.fd_or_UseTime))])]),n._v(" "),t("el-form-item",{attrs:{label:"备注:"}},[t("span",[n._v(n._s(e.row.fd_or_Remark))])])],1)]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"用户名称",align:"center",prop:"fd_or_UserName"}}),n._v(" "),t("el-table-column",{attrs:{label:"订单状态",align:"center",prop:"fd_or_PayState"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n          "+n._s(n._f("payStatus")(e.row.fd_or_PayState))+"\n        ")]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"出票状态",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n          "+n._s(n._f("getOutStatus")(e.row.fd_or_OutStatus))+"\n        ")]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"总价格",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n          "+n._s(e.row.fd_or_SumPrice?e.row.fd_or_SumPrice+"元":"")+"\n        ")]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.row.fd_or_OutStatus,expression:"!scope.row.fd_or_OutStatus"}],attrs:{type:"success",size:"mini"},on:{click:function(t){n.orderOk(e.row.fd_or_OrderID)}}},[n._v("确认订单\n          ")]),n._v(" "),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){n.Delete(e.row.fd_or_OrderID)}}},[n._v("注销订单\n          ")])]}}])})],1),n._v(" "),t("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var s=t("VU/8")(r,o,!1,function(n){t("m75M")},"data-v-481fb6e6",null);e.default=s.exports},a0la:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},m75M:function(n,e,t){var a=t("a0la");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("4a9277eb",a,!0)}});