webpackJsonp([5],{"/JFv":function(n,t,e){(n.exports=e("bKW+")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"2/62":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("SJI6"),a={name:"",data:function(){return{orderID:"",touristTraderID:"",total:0,hotelID:"",isLoading:!1}},computed:Object(r.mapGetters)(["hotelConfirmOrderList"]),created:function(){if(this.hotelID=sessionStorage.getItem("hotelID"),!this.hotelID)return this.$router.push({name:"HotelDetil"}),void this.$notify({message:"请先添加酒店信息!",position:"top-left",type:"error"});this.touristTraderID=JSON.parse(sessionStorage.getItem("admin")).sm_ui_ID,this.initData("",1)},methods:{getSummaries:function(n){var t=n.columns,e=n.data,r=[];return t.forEach(function(n,t){if(0!==t){var a=e.map(function(t){return Number(t[n.property])});a.every(function(n){return isNaN(n)})?r[t]="N/A":(r[t]=a.reduce(function(n,t){var e=Number(t);return isNaN(e)?parseInt(n):parseInt(n+t)},0),r[t]+=" 元")}else r[t]="总价"}),r},confirmOrder:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_or_OrderID:n};this.$store.dispatch("ConfirmOrder",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData("",1)},function(n){t.$notify({message:n,type:"error"})})},handleCurrentChange:function(n){this.initData(this.orderID,n)},initData:function(n,t){var e=this,r={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_or_OrderID:n||"",ht_or_UserID:"",ht_or_TouristTraderID:this.touristTraderID,ht_or_Password:"",page:t||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initHotelConfirmOrder",r).then(function(n){e.total=n,e.isLoading=!1},function(n){e.$notify({message:n,type:"error"})})},search:function(){this.initData(this.orderID,1)}}},o={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("酒店确认订单")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("订单号筛选:")])]),n._v(" "),e("el-form-item",[e("el-input",{staticStyle:{width:"250px"},attrs:{type:"text","auto-complete":"off",placeholder:"订单号",size:"small"},model:{value:n.orderID,callback:function(t){n.orderID=t},expression:"orderID"}})],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:n.hotelConfirmOrderList,"summary-method":n.getSummaries,"show-summary":"",size:"small"}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"房间产品ID:"}},[e("span",[n._v(n._s(t.row.ht_or_RoomProductID))])]),n._v(" "),e("el-form-item",{attrs:{label:"用户编码:"}},[e("span",[n._v(n._s(t.row.ht_or_UserID))])]),n._v(" "),e("el-form-item",{attrs:{label:"用户名称:"}},[e("span",[n._v(n._s(t.row.ht_or_UserName))])]),n._v(" "),e("el-form-item",{attrs:{label:"商户编码:"}},[e("span",[n._v(n._s(t.row.ht_or_TouristTraderID))])]),n._v(" "),e("el-form-item",{attrs:{label:"商户名称:"}},[e("span",[n._v(n._s(t.row.ht_or_TouristTraderName))])]),n._v(" "),e("el-form-item",{attrs:{label:"凭证码:"}},[e("span",[n._v(n._s(t.row.ht_or_Password))])]),n._v(" "),e("el-form-item",{attrs:{label:"总间数:"}},[e("span",[n._v(n._s(t.row.ht_or_TicketCount))])]),n._v(" "),e("el-form-item",{attrs:{label:"入住日期:"}},[e("span",[n._v(n._s(t.row.ht_or_InDate))])]),n._v(" "),e("el-form-item",{attrs:{label:"离店日期:"}},[e("span",[n._v(n._s(t.row.ht_or_OutDate))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单创建时间:"}},[e("span",[n._v(n._s(n._f("getUseTime")(t.row.ht_or_CreateTime)))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单支付时间:"}},[e("span",[n._v(n._s(n._f("getUseTime")(t.row.ht_or_PayTime)))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付方式:"}},[e("span",[n._v(n._s(t.row.ht_or_PayWay))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付参数:"}},[e("span",[n._v(n._s(t.row.ht_or_PayParam))])]),n._v(" "),e("el-form-item",{attrs:{label:"支付状态:"}},[e("span",[n._v(n._s(t.row.ht_or_PayState))])]),n._v(" "),e("el-form-item",{attrs:{label:"使用状态:"}},[e("span",[n._v(n._s(t.row.ht_or_UseState))])]),n._v(" "),e("el-form-item",{attrs:{label:"结算状态:"}},[e("span",[n._v(n._s(t.row.ts_to_IsBalance))])]),n._v(" "),e("el-form-item",{attrs:{label:"备注:"}},[e("span",[n._v(n._s(t.row.ts_to_Remark))])]),n._v(" "),e("el-form-item",{attrs:{label:"手机号:"}},[e("span",[n._v(n._s(t.row.ht_od_Phone))])]),n._v(" "),e("el-form-item",{attrs:{label:"邮箱:"}},[e("span",[n._v(n._s(t.row.ht_od_Email))])]),n._v(" "),e("el-form-item",{attrs:{label:"订单名称:"}},[e("span",[n._v(n._s(t.row.ht_or_GoodsListName))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_or_OrderID",label:"订单号",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_or_SumPrice",label:"总金额(元)",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_or_SumService",label:"总的网售手续费(元)",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_or_OutStatus",label:"出单状态",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_or_FullPrice",label:"价格(元)",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_or_SumService",label:"总的网售手续费(元)",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[1!=t.row.ht_or_OutStatus?e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.confirmOrder(t.row.ht_or_OrderID)}}},[n._v("确认订单\n        ")]):e("span",{staticStyle:{"font-weight":"bold"}},[n._v("已出单")])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":20,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=e("XAIM")(a,o,!1,function(n){e("Syxq")},"data-v-fa849576",null);t.default=s.exports},Syxq:function(n,t,e){var r=e("/JFv");"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);e("6imX")("8d1e1a2a",r,!0)}});