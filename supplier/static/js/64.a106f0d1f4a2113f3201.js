webpackJsonp([64],{FpRb:function(n,e,t){var i=t("poHS");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("487cb9c5",i,!0)},SIKw:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("//Fk"),a=t.n(i),s=t("NYxO"),r={name:"",computed:Object(s.b)(["adminTradeGoodList","adminProductLine","adminLinePrepare","adminTimeActivitiesList","adminScheduleTimeList","adminActiveReminderList","updateAdminActiveReminderObj","adminActivityMealManagementId"]),data:function(){return{userName:"",GoodId:"",LineID:"",TimeID:"",userSearchID:"",TimeActiveID:"",isLoading:!1,addAdminActiveReminderDialog:!1,updateAdminActiveReminderDialog:!1,addAdminActiveReminderObj:{ts_an_TimeActivityID:"",ts_an_DoWork:"",ts_an_WasteTime:"",ts_an_Remark:""}}},methods:{handleSelect:function(n){this.userName=n.value;var e={loginUserID:"huileyou",loginUserPass:123,goodID:n.id?n.id:""};this.$store.dispatch("initAdminProductLine",e)},loadAll:function(n,e){var t=this;return new a.a(function(n,i){var a=JSON.parse(sessionStorage.getItem("admin")),s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:a.sm_ai_ID?a.sm_ai_ID:"",goodTitle:e||"",userID:"",pcName:"",ID:"",isDelete:0,page:1,rows:100};t.$store.dispatch("initAdminTradeGoodList",s).then(function(e){n(e)},function(n){t.$notify({message:n,type:"error"})})})},querySearchAsync:function(n,e){var t=this;this.loadAll(1,n).then(function(n){n=(n=n.data).map(function(n){return{id:n.ta_tg_ID,value:n.ta_tg_Title}}),t.restaurants=n,clearTimeout(t.timeout),t.timeout=setTimeout(function(){e(t.restaurants)},10)})},changeLineID:function(){var n=this;this.LineID="";var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:this.userSearchID?this.userSearchID:""};this.$store.dispatch("initAdminLinePrepare",e).then(function(){},function(e){n.$notify({message:e,type:"error"})})},changeLineTime:function(){this.TimeID="";var n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",isDelete:"0",goodID:this.LineID?this.LineID:""};this.$store.dispatch("initAdminScheduleTime",n)},changeTimeActive:function(){var n=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:this.TimeID?this.TimeID:""};this.$store.dispatch("initAdminTimeActivities",e).then(function(){},function(e){n.$notify({message:e,type:"error"})})},initData:function(n){var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:n||""};this.$store.dispatch("initAdminActiveReminder",e)},search:function(){this.initData(this.TimeActiveID)},searchInitData:function(){this.initData(this.adminActivityMealManagementId)},addAdminActiveReminder:function(){this.$store.commit("setTranstionFalse"),this.addAdminActiveReminderDialog=!0},addAdminActiveReminderSubmit:function(){var n=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addAdminActiveReminderObj};this.$store.dispatch("addAdminActiveReminderObj",e).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.addAdminActiveReminderObj.ts_an_TimeActivityID)},function(e){n.$notify({message:e,type:"error"})}),this.addAdminActiveReminderDialog=!1},updateAdminActiveReminder:function(n){this.$store.commit("setTranstionFalse"),this.$store.commit("updateAdminActiveReminderObj",n),this.updateAdminActiveReminderDialog=!0},updateAdminActiveReminderSubmit:function(){var n=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateAdminActiveReminderObj};this.$store.dispatch("updateAdminActiveReminderSubmit",e).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.updateAdminActiveReminderObj.ts_an_TimeActivityID)},function(e){n.$notify({message:e,type:"error"})}),this.updateAdminActiveReminderDialog=!1},deleteAdminActiveReminder:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",ID:n};this.$store.dispatch("deleteAdminActiveReminder",t).then(function(n){e.$notify({message:n,type:"success"}),e.TimeActiveID?e.initData(e.TimeActiveID):e.initData(e.adminActivityMealManagementId)},function(n){e.$notify({message:n,type:"error"})})}},mounted:function(){this.searchInitData()}},o={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("h1",{staticClass:"userClass"},[n._v("活动温馨提示")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",[t("span",[n._v("时间活动筛选:")])]),n._v(" "),t("el-form-item",[t("el-autocomplete",{staticStyle:{width:"200px"},attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择产品"},on:{select:n.handleSelect},model:{value:n.userName,callback:function(e){n.userName=e},expression:"userName"}})],1),n._v(" "),t("el-form-item",[t("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择产品线路"},on:{change:n.changeLineID},model:{value:n.userSearchID,callback:function(e){n.userSearchID=e},expression:"userSearchID"}},n._l(n.adminProductLine,function(n){return t("el-option",{key:n.ts_pt_ID,attrs:{label:n.ts_pt_Name,value:n.ts_pt_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择线路日程"},on:{change:n.changeLineTime},model:{value:n.LineID,callback:function(e){n.LineID=e},expression:"LineID"}},n._l(n.adminLinePrepare,function(n){return t("el-option",{key:n.ts_pt_ID,attrs:{label:"第"+n.ts_pt_Day+"天",value:n.ts_pt_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择日程时间"},on:{change:n.changeTimeActive},model:{value:n.TimeID,callback:function(e){n.TimeID=e},expression:"TimeID"}},n._l(n.adminScheduleTimeList,function(n){return t("el-option",{key:n.ts_tt_ID,attrs:{label:n.ts_tt_DoTime,value:n.ts_tt_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.TimeActiveID,callback:function(e){n.TimeActiveID=e},expression:"TimeActiveID"}},n._l(n.adminTimeActivitiesList,function(n){return t("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("查询")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.addAdminActiveReminder}},[n._v("新增")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminActiveReminderList}},[t("el-table-column",{attrs:{align:"center",prop:"ts_an_ID",label:"主键编号"}}),n._v(" "),t("el-table-column",{attrs:{align:"center",prop:"ts_an_TimeActivityID",label:"时间活动编号"}}),n._v(" "),t("el-table-column",{attrs:{align:"center",label:"做的事情"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-popover",{ref:"popover1",attrs:{placement:"top-start",width:"200",trigger:"hover",content:e.row.ts_an_DoWork}}),n._v(" "),t("el-button",{directives:[{name:"popover",rawName:"v-popover:popover1",arg:"popover1"}],attrs:{size:"small"}},[n._v("移入查看")])]}}])}),n._v(" "),t("el-table-column",{attrs:{align:"center",prop:"ts_an_WasteTime",label:"活动时间"}}),n._v(" "),t("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-popover",{ref:"popover1",attrs:{placement:"top-start",width:"200",trigger:"hover",content:e.row.ts_an_Remark}}),n._v(" "),t("el-button",{directives:[{name:"popover",rawName:"v-popover:popover1",arg:"popover1"}],attrs:{size:"small"}},[n._v("移入查看")])]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{size:"mini"},on:{click:function(t){n.updateAdminActiveReminder(e.row.ts_an_ID)}}},[n._v("修改\n        ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){n.deleteAdminActiveReminder(e.row.ts_an_ID)}}},[n._v("删除\n        ")])]}}])})],1),n._v(" "),t("el-dialog",{attrs:{title:"添加活动温馨提示",visible:n.addAdminActiveReminderDialog},on:{"update:visible":function(e){n.addAdminActiveReminderDialog=e}}},[t("el-form",{attrs:{model:n.addAdminActiveReminderObj,"label-width":"120px"}},[t("el-form-item",{attrs:{label:"时间活动编号:"}},[t("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.addAdminActiveReminderObj.ts_an_TimeActivityID,callback:function(e){n.$set(n.addAdminActiveReminderObj,"ts_an_TimeActivityID",e)},expression:"addAdminActiveReminderObj.ts_an_TimeActivityID"}},n._l(n.adminTimeActivitiesList,function(n){return t("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"做的事情:"}},[t("el-input",{model:{value:n.addAdminActiveReminderObj.ts_an_DoWork,callback:function(e){n.$set(n.addAdminActiveReminderObj,"ts_an_DoWork",e)},expression:"addAdminActiveReminderObj.ts_an_DoWork"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"活动时间:"}},[t("el-input",{model:{value:n.addAdminActiveReminderObj.ts_an_WasteTime,callback:function(e){n.$set(n.addAdminActiveReminderObj,"ts_an_WasteTime",e)},expression:"addAdminActiveReminderObj.ts_an_WasteTime"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"备注:"}},[t("el-input",{model:{value:n.addAdminActiveReminderObj.ts_an_Remark,callback:function(e){n.$set(n.addAdminActiveReminderObj,"ts_an_Remark",e)},expression:"addAdminActiveReminderObj.ts_an_Remark"}})],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.addAdminActiveReminderDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.addAdminActiveReminderSubmit}},[n._v("确 定")])],1)],1),n._v(" "),t("el-dialog",{attrs:{title:"修改活动温馨提示",visible:n.updateAdminActiveReminderDialog},on:{"update:visible":function(e){n.updateAdminActiveReminderDialog=e}}},[t("el-form",{attrs:{model:n.updateAdminActiveReminderObj,"label-width":"120px"}},[t("el-form-item",{attrs:{label:"主键编号:"}},[t("el-input",{model:{value:n.updateAdminActiveReminderObj.ts_an_ID,callback:function(e){n.$set(n.updateAdminActiveReminderObj,"ts_an_ID",e)},expression:"updateAdminActiveReminderObj.ts_an_ID"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"时间活动编号:"}},[t("el-input",{model:{value:n.updateAdminActiveReminderObj.ts_an_TimeActivityID,callback:function(e){n.$set(n.updateAdminActiveReminderObj,"ts_an_TimeActivityID",e)},expression:"updateAdminActiveReminderObj.ts_an_TimeActivityID"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"做的事情:"}},[t("el-input",{model:{value:n.updateAdminActiveReminderObj.ts_an_DoWork,callback:function(e){n.$set(n.updateAdminActiveReminderObj,"ts_an_DoWork",e)},expression:"updateAdminActiveReminderObj.ts_an_DoWork"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"活动时间:"}},[t("el-input",{model:{value:n.updateAdminActiveReminderObj.ts_an_WasteTime,callback:function(e){n.$set(n.updateAdminActiveReminderObj,"ts_an_WasteTime",e)},expression:"updateAdminActiveReminderObj.ts_an_WasteTime"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"备注:"}},[t("el-input",{model:{value:n.updateAdminActiveReminderObj.ts_an_Remark,callback:function(e){n.$set(n.updateAdminActiveReminderObj,"ts_an_Remark",e)},expression:"updateAdminActiveReminderObj.ts_an_Remark"}})],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.updateAdminActiveReminderDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.updateAdminActiveReminderSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=t("VU/8")(r,o,!1,function(n){t("FpRb")},null,null);e.default=d.exports},poHS:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});