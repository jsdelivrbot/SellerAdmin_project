webpackJsonp([72],{"3mR3":function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},ZfbK:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("//Fk"),a=e.n(i),s=e("NYxO"),o={name:"",computed:Object(s.b)(["adminTradeGoodList","adminProductLine","adminLinePrepare","adminTimeActivitiesList","adminScheduleTimeList","adminActiveHotelList","updateAdminActiveHotelObj","adminActivityMealManagementId"]),data:function(){return{userName:"",GoodId:"",LineID:"",TimeID:"",userSearchID:"",TimeActiveID:"",isLoading:!1,addAdminActiveHotelDialog:!1,updateAdminActiveHotelDialog:!1,addAdminActiveHotelObj:{ts_ah_TimeActivityID:"",ts_ah_Distance:"",ts_ah_DoWork:"",ts_ah_WasteTime:"",ts_ah_Remark:""}}},methods:{handleSelect:function(n){this.userName=n.value;var t={loginUserID:"huileyou",loginUserPass:123,goodID:n.id?n.id:""};this.$store.dispatch("initAdminProductLine",t)},loadAll:function(n,t){var e=this;return new a.a(function(n,i){var a=JSON.parse(sessionStorage.getItem("admin")),s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:a.sm_ui_ID?a.sm_ui_ID:"",goodTitle:t||"",userID:"",pcName:"",ID:"",isDelete:0,page:1,rows:100};e.$store.dispatch("initAdminTradeGoodList",s).then(function(t){n(t)},function(n){e.$notify({message:n,type:"error"})})})},querySearchAsync:function(n,t){var e=this;this.loadAll(1,n).then(function(n){n=(n=n.data).map(function(n){return{id:n.ta_tg_ID,value:n.ta_tg_Title}}),e.restaurants=n,clearTimeout(e.timeout),e.timeout=setTimeout(function(){t(e.restaurants)},10)})},changeLineID:function(){var n=this;this.LineID="";var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:this.userSearchID?this.userSearchID:""};this.$store.dispatch("initAdminLinePrepare",t).then(function(){},function(t){n.$notify({message:t,type:"error"})})},changeLineTime:function(){this.TimeID="";var n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",isDelete:"0",goodID:this.LineID?this.LineID:""};this.$store.dispatch("initAdminScheduleTime",n)},changeTimeActive:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:this.TimeID?this.TimeID:""};this.$store.dispatch("initAdminTimeActivities",t).then(function(){},function(t){n.$notify({message:t,type:"error"})})},initData:function(n){var t={loginUserID:"huileyou",loginUserPass:"123",goodID:n||""};this.isLoading=!0,this.$store.dispatch("initAdminActiveHotelList",t),this.isLoading=!1},search:function(){this.initData(this.TimeActiveID)},searchInitData:function(){this.initData(this.adminActivityMealManagementId)},addAdminActiveHotel:function(){for(var n in this.addAdminActiveHotelObj)this.addAdminActiveHotelObj[n]="";this.$store.commit("setTranstionFalse"),this.addAdminActiveHotelDialog=!0},addAdminActiveHotelSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addAdminActiveHotelObj};this.$store.dispatch("addAdminActiveHotel",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.addAdminActiveHotelObj.ts_ah_TimeActivityID)},function(t){n.$notify({message:t,type:"error"})}),this.addAdminActiveHotelDialog=!1},updateAdminActiveHotel:function(n){this.updateAdminActiveHotelDialog=!0,this.$store.commit("setTranstionFalse"),this.$store.commit("initUpdateAdminActiveHotelObj",n)},updateAdminActiveHotelSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_ah_TimeActivityID:this.updateAdminActiveHotelObj.ts_ah_TimeActivityID,ts_ah_Distance:this.updateAdminActiveHotelObj.ts_ah_Distance,ts_ah_DoWork:this.updateAdminActiveHotelObj.ts_ah_DoWork,ts_ah_WasteTime:this.updateAdminActiveHotelObj.ts_ah_WasteTime,ts_ah_Remark:this.updateAdminActiveHotelObj.ts_ah_Remark}};this.$store.dispatch("updateAdminActivityHotel",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.updateAdminActiveHotelObj.ts_ah_TimeActivityID)},function(t){n.$notify({message:t,type:"error"})}),this.updateAdminActiveHotelDialog=!1},deleteAdminActiveHotel:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",ID:n};this.$store.dispatch("deleteAdminActiveHotel",e).then(function(n){t.$notify({message:n,type:"success"}),t.TimeActiveID?t.initData(t.TimeActiveID):t.initData(t.adminActivityMealManagementId)},function(n){t.$notify({message:n,type:"error"})})}},mounted:function(){this.searchInitData()}},l={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("h1",{staticClass:"userClass"},[n._v("活动住宿")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("时间活动筛选:")])]),n._v(" "),e("el-form-item",[e("el-autocomplete",{staticStyle:{width:"200px"},attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择产品"},on:{select:n.handleSelect},model:{value:n.userName,callback:function(t){n.userName=t},expression:"userName"}})],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择产品线路"},on:{change:n.changeLineID},model:{value:n.userSearchID,callback:function(t){n.userSearchID=t},expression:"userSearchID"}},n._l(n.adminProductLine,function(n){return e("el-option",{key:n.ts_pt_ID,attrs:{label:n.ts_pt_Name,value:n.ts_pt_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择线路日程"},on:{change:n.changeLineTime},model:{value:n.LineID,callback:function(t){n.LineID=t},expression:"LineID"}},n._l(n.adminLinePrepare,function(n){return e("el-option",{key:n.ts_pt_ID,attrs:{label:"第"+n.ts_pt_Day+"天",value:n.ts_pt_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择日程时间"},on:{change:n.changeTimeActive},model:{value:n.TimeID,callback:function(t){n.TimeID=t},expression:"TimeID"}},n._l(n.adminScheduleTimeList,function(n){return e("el-option",{key:n.ts_tt_ID,attrs:{label:n.ts_tt_DoTime,value:n.ts_tt_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.TimeActiveID,callback:function(t){n.TimeActiveID=t},expression:"TimeActiveID"}},n._l(n.adminTimeActivitiesList,function(n){return e("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addAdminActiveHotel}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminActiveHotelList}},[e("el-table-column",{attrs:{align:"center",prop:"ts_ah_ID",label:"主键编号"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_ah_TimeActivityID",label:"时间活动编号"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_ah_DoWork",label:"做的事情"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_ah_WasteTime",label:"活动时间"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_ah_Distance",label:"行驶距离"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-popover",{ref:"popover1",attrs:{placement:"top-start",width:"200",trigger:"hover",content:t.row.ts_ah_Remark}}),n._v(" "),e("el-button",{directives:[{name:"popover",rawName:"v-popover:popover1",arg:"popover1"}],attrs:{size:"small"}},[n._v("移入查看")])]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){n.updateAdminActiveHotel(t.row.ts_ah_ID)}}},[n._v("修改\n        ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.deleteAdminActiveHotel(t.row.ts_ah_ID)}}},[n._v("删除\n        ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加活动住宿",visible:n.addAdminActiveHotelDialog},on:{"update:visible":function(t){n.addAdminActiveHotelDialog=t}}},[e("el-form",{attrs:{model:n.addAdminActiveHotelObj,"label-width":"120px"}},[e("el-form-item",{attrs:{label:"时间活动编号:"}},[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.addAdminActiveHotelObj.ts_ah_TimeActivityID,callback:function(t){n.$set(n.addAdminActiveHotelObj,"ts_ah_TimeActivityID",t)},expression:"addAdminActiveHotelObj.ts_ah_TimeActivityID"}},n._l(n.adminTimeActivitiesList,function(n){return e("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"行驶距离:"}},[e("el-input",{model:{value:n.addAdminActiveHotelObj.ts_ah_Distance,callback:function(t){n.$set(n.addAdminActiveHotelObj,"ts_ah_Distance",t)},expression:"addAdminActiveHotelObj.ts_ah_Distance"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"做的事情:"}},[e("el-input",{model:{value:n.addAdminActiveHotelObj.ts_ah_DoWork,callback:function(t){n.$set(n.addAdminActiveHotelObj,"ts_ah_DoWork",t)},expression:"addAdminActiveHotelObj.ts_ah_DoWork"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"活动时间:"}},[e("el-input",{model:{value:n.addAdminActiveHotelObj.ts_ah_WasteTime,callback:function(t){n.$set(n.addAdminActiveHotelObj,"ts_ah_WasteTime",t)},expression:"addAdminActiveHotelObj.ts_ah_WasteTime"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:"}},[e("el-input",{model:{value:n.addAdminActiveHotelObj.ts_ah_Remark,callback:function(t){n.$set(n.addAdminActiveHotelObj,"ts_ah_Remark",t)},expression:"addAdminActiveHotelObj.ts_ah_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addAdminActiveHotelDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addAdminActiveHotelSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改活动住宿",visible:n.updateAdminActiveHotelDialog},on:{"update:visible":function(t){n.updateAdminActiveHotelDialog=t}}},[e("el-form",{attrs:{model:n.updateAdminActiveHotelObj,"label-width":"120px"}},[e("el-form-item",{attrs:{label:"主键编号:"}},[e("el-input",{attrs:{disabled:!0},model:{value:n.updateAdminActiveHotelObj.ts_ah_ID,callback:function(t){n.$set(n.updateAdminActiveHotelObj,"ts_ah_ID",t)},expression:"updateAdminActiveHotelObj.ts_ah_ID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"活动时间编号:"}},[e("el-input",{attrs:{disabled:!0},model:{value:n.updateAdminActiveHotelObj.ts_ah_TimeActivityID,callback:function(t){n.$set(n.updateAdminActiveHotelObj,"ts_ah_TimeActivityID",t)},expression:"updateAdminActiveHotelObj.ts_ah_TimeActivityID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"行驶距离:"}},[e("el-input",{model:{value:n.updateAdminActiveHotelObj.ts_ah_Distance,callback:function(t){n.$set(n.updateAdminActiveHotelObj,"ts_ah_Distance",t)},expression:"updateAdminActiveHotelObj.ts_ah_Distance"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"做的事情:"}},[e("el-input",{model:{value:n.updateAdminActiveHotelObj.ts_ah_DoWork,callback:function(t){n.$set(n.updateAdminActiveHotelObj,"ts_ah_DoWork",t)},expression:"updateAdminActiveHotelObj.ts_ah_DoWork"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"活动时间:"}},[e("el-input",{model:{value:n.updateAdminActiveHotelObj.ts_ah_WasteTime,callback:function(t){n.$set(n.updateAdminActiveHotelObj,"ts_ah_WasteTime",t)},expression:"updateAdminActiveHotelObj.ts_ah_WasteTime"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:"}},[e("el-input",{model:{value:n.updateAdminActiveHotelObj.ts_ah_Remark,callback:function(t){n.$set(n.updateAdminActiveHotelObj,"ts_ah_Remark",t)},expression:"updateAdminActiveHotelObj.ts_ah_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateAdminActiveHotelDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateAdminActiveHotelSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=e("VU/8")(o,l,!1,function(n){e("mH2I")},null,null);t.default=c.exports},mH2I:function(n,t,e){var i=e("3mR3");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("20713da2",i,!0)}});