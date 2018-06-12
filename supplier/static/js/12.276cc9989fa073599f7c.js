webpackJsonp([12],{IYZr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("NYxO"),o={name:"",data:function(){return{orderID:"",touristTraderID:"",total:0,isLoading:!1}},computed:Object(a.b)(["hotelOrderDetailsList"]),created:function(){if(this.hotelID=sessionStorage.getItem("hotelID"),!this.hotelID)return this.$router.push({name:"HotelDetil"}),void this.$notify({message:"请先添加酒店信息!",position:"top-left",type:"error"});this.touristTraderID=JSON.parse(sessionStorage.getItem("admin")).sm_ai_AgentID,this.initData("",1)},methods:{getSummaries:function(t){var e=t.columns,r=t.data,a=[];return e.forEach(function(t,e){if(0!==e){var o=r.map(function(e){return Number(e[t.property])});o.every(function(t){return isNaN(t)})?a[e]="N/A":(a[e]=o.reduce(function(t,e){var r=Number(e);return isNaN(r)?parseInt(t):parseInt(t+e)},0),a[e]+=" 元")}else a[e]="总价"}),a},handleCurrentChange:function(t){this.initData(this.orderID,t)},initData:function(t,e){var r=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_od_ID:"",ht_od_OrderID:t||"",ht_od_ticketID:"",ht_od_TouristTraderID:this.touristTraderID,page:e||1,rows:"20"};this.isLoading=!0,this.$store.dispatch("initHotelOrderDetails",a).then(function(t){r.total=t,r.isLoading=!1},function(t){r.$notify({message:t,type:"error"})})},search:function(){this.initData(this.orderID,1)},print:function(t){var e=document.querySelector("#wrap");return document.body.innerHTML=e.innerHTML,window.print(),window.location.reload(),!1}}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[r("h1",{staticClass:"userClass not-print"},[t._v("酒店订单明细")]),t._v(" "),r("el-col",{staticClass:"formSearch not-print",attrs:{span:24}},[r("el-form",{attrs:{inline:!0}},[r("el-form-item",[r("span",[t._v("订单号筛选:")])]),t._v(" "),r("el-form-item",[r("el-input",{staticStyle:{width:"250px"},attrs:{type:"text","auto-complete":"off",placeholder:"订单号",size:"small"},model:{value:t.orderID,callback:function(e){t.orderID=e},expression:"orderID"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.print}},[t._v("打印")])],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:t.hotelOrderDetailsList,border:"","summary-method":t.getSummaries,"show-summary":"",size:"small"}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:"订单明细编号:"}},[r("span",[t._v(t._s(e.row.ht_od_ID))])]),t._v(" "),r("el-form-item",{attrs:{label:"订单虚拟票号:"}},[r("span",[t._v(t._s(e.row.ht_od_ticketID))])]),t._v(" "),r("el-form-item",{attrs:{label:"旅行社商家编码:"}},[r("span",[t._v(t._s(e.row.ht_od_TouristTraderID))])]),t._v(" "),r("el-form-item",{attrs:{label:"旅行社商家名称:"}},[r("span",[t._v(t._s(e.row.ht_od_TouristTraderName))])]),t._v(" "),r("el-form-item",{attrs:{label:"邮箱:"}},[r("span",[t._v(t._s(e.row.ht_od_Email))])]),t._v(" "),r("el-form-item",{attrs:{label:"入住日期:"}},[r("span",[t._v(t._s(t._f("getUseTime")(e.row.ht_od_TourDate)))])]),t._v(" "),r("el-form-item",{attrs:{label:"房间锁定ID:"}},[r("span",[t._v(t._s(e.row.ht_od_SeatNo))])]),t._v(" "),r("el-form-item",{attrs:{label:"使用状态:"}},[r("span",[t._v(t._s(e.row.ht_od_UseStatus))])]),t._v(" "),r("el-form-item",{attrs:{label:"订单发起时间:"}},[r("span",[t._v(t._s(t._f("getUseTime")(e.row.ht_od_CreateTime)))])])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"ht_od_OrderID",label:"订单号",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"ht_od_GoodsListName",label:"旅行社产品名称",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"ht_od_SellPrice",label:"订单价格(元)",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"ht_od_ServiceFee",label:"服务费(元)",align:"center"}})],1),t._v(" "),r("div",{staticClass:"block",staticStyle:{float:"right"}},[r("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":20,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=r("VU/8")(o,i,!1,function(t){r("lEU6")},"data-v-ab3ddafc",null);e.default=s.exports},lEU6:function(t,e,r){var a=r("lEVp");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("aaf3c374",a,!0)},lEVp:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"\n@media print {\n.not-print[data-v-ab3ddafc] {\n    opacity: 0\n}\n}\n",""])}});