webpackJsonp([24],{"7SxT":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("SJI6"),s=i("iTKD"),o=i("jvWE"),n={name:"",components:{Editor:s.a},computed:Object(a.mapGetters)(["predeterminedInstructionsList","updatePredeterminedInstructionsObj","ticketAttractionsList"]),data:function(){return{tourName:"",siteName:"",isLoading:!1,addOptions:{tm_bk_TourSiteID:"",tm_bk_OpenTime:"",tm_bk_SpecialPolicy:"",tm_bk_Remind:"",tm_bk_HappyNotice:"",tm_bk_TicketSay:"",tm_bk_ReturnRule:"",tm_bk_SpecialMessage:""},addDialog:!1,formLabelWidth:"120px",updateDialog:!1,adminUserInfo:"",ticketAttractionsValue:""}},methods:{jump:function(t){window.open("http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/"+this.ticketAttractionsValue,"_blank")},handleSelect:function(t){this.ticketAttractionsValue=t.id,this.addOptions.tm_bk_TourSiteID=t.id,this.updatePredeterminedInstructionsObj.tm_bk_TourSiteID=t.id},loadAll:function(t,e){var i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:e,tm_ts_TradeInfoID:this.adminUserInfo.sm_ui_ID,tm_ts_IsDelete:0,tm_ts_IsPass:"",tm_ts_ShowTop:"",tm_ts_IsHot:"",tm_ts_ThemeTypeID:""};return this.$store.dispatch("initSearchTicketAttractions",i)},querySearchAsync:function(t,e){var i=this;this.loadAll(1,t).then(function(t){t=t.map(function(t){return{id:t.tm_ts_Code,value:t.tm_ts_Name}}),i.restaurants=t,clearTimeout(i.timeout),i.timeout=setTimeout(function(){e(i.restaurants)},10)})},initTicketAttraction:function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:"",tm_ts_TradeInfoID:this.adminUserInfo.sm_ui_ID,tm_ts_IsDelete:0,tm_ts_IsPass:"",tm_ts_ShowTop:"",tm_ts_IsHot:"",tm_ts_ThemeTypeID:"",page:1,rows:5};this.$store.dispatch("initTicketAttractions",t)},initData:function(t){var e=this;if(t){this.isLoading=!0;var i={loginUserID:"huileyou",loginUserPass:"123",tm_bk_TourSiteID:t};this.$store.dispatch("initPredeterminedInstructions",i).then(function(){e.isLoading=!1},function(t){e.$notify({message:t,type:"error"})})}else this.$notify({message:"请选择景点!!",type:"error"})},search:function(){this.initData(this.ticketAttractionsValue)},Add:function(){var t=document.querySelectorAll(".w-e-text");if(t&&t.length)for(var e=0;e<t.length;e++)t[e].innerHTML="";this.addDialog=!0},addSubmit:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",data:this.addOptions};this.$store.dispatch("addPredeterminedInstructionsSubmit",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.addOptions.tm_bk_TourSiteID)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},update:function(t){this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.$store.commit("updatePredeterminedInstructions",t)},updateSubmit:function(){var t=this;for(var e in this.updatePredeterminedInstructionsObj)"tm_bk_ID"==e&&"tm_bk_TourSiteID"==e||(this.updatePredeterminedInstructionsObj[e]=Object(o.a)(this.updatePredeterminedInstructionsObj[e]));var i={loginUserID:"huileyou",loginUserPass:"123",data:this.updatePredeterminedInstructionsObj};this.$store.dispatch("updatePredeterminedInstructionsSubmit",i).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.updatePredeterminedInstructionsObj.tm_bk_TourSiteID)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"gE+PQ5wMkJpDAR2sPoMCcUpZMMaLK5CJ8gwkgNXYxtfeq5GxZH0evU2mm9C422ufOJYTPRVRn4Myx9m5W4Xjyg==",data:{tm_bk_ID:t.tm_bk_ID}};this.$store.dispatch("DeleteTicketPredeterminedInstructions",i).then(function(){e.initData(t.tm_bk_TourSiteID)})}},created:function(){this.adminUserInfo=JSON.parse(sessionStorage.getItem("admin"))}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[i("h1",{staticClass:"userClass"},[t._v("预定须知")]),t._v(" "),i("div",{staticClass:"search"},[i("el-autocomplete",{attrs:{size:"mini","fetch-suggestions":t.querySearchAsync,placeholder:"请输入景点名称"},on:{select:t.handleSelect},model:{value:t.tourName,callback:function(e){t.tourName=e},expression:"tourName"}}),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.search}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.Add}},[t._v("新增")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.predeterminedInstructionsList}},[i("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[i("el-form-item",{attrs:{label:"预定须知编号:"}},[i("span",[t._v(t._s(e.row.tm_bk_ID))])]),t._v(" "),i("el-form-item",{attrs:{label:"开放时间:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_OpenTime)}})]),t._v(" "),i("el-form-item",{attrs:{label:"特殊人群政策:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_SpecialPolicy)}})]),t._v(" "),i("el-form-item",{attrs:{label:"预订提醒:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_Remind)}})]),t._v(" "),i("el-form-item",{attrs:{label:"温馨提示:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_HappyNotice)}})]),t._v(" "),i("el-form-item",{attrs:{label:"发票说明:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_TicketSay)}})]),t._v(" "),i("el-form-item",{attrs:{label:"退改规则:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_ReturnRule)}})]),t._v(" "),i("el-form-item",{attrs:{label:"特殊信息:"}},[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_SpecialMessage)}})])],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"预定须知编号",prop:"tm_bk_ID"}}),t._v(" "),i("el-table-column",{attrs:{label:"开放时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{domProps:{innerHTML:t._s(e.row.tm_bk_OpenTime)}})]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini"},on:{click:function(i){t.update(e.row.tm_bk_ID)}}},[t._v("修改\n          ")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.Delete(e.row)}}},[t._v("删除\n          ")]),t._v(" "),i("el-button",{attrs:{type:"success",size:"small"},on:{click:function(i){t.jump(e.row)}}},[t._v("预览效果\n          ")])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:"添加预定须知",visible:t.addDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(e){t.addDialog=e}}},[i("el-form",{attrs:{model:t.addOptions}},[i("el-form-item",{attrs:{label:"景点名称:","label-width":t.formLabelWidth}},[i("el-autocomplete",{attrs:{"fetch-suggestions":t.querySearchAsync,placeholder:"请输入景点名称"},on:{select:t.handleSelect},model:{value:t.tourName,callback:function(e){t.tourName=e},expression:"tourName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开放时间:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_OpenTime,callback:function(e){t.$set(t.addOptions,"tm_bk_OpenTime",e)},expression:"addOptions.tm_bk_OpenTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"特殊人群政策:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_SpecialPolicy,callback:function(e){t.$set(t.addOptions,"tm_bk_SpecialPolicy",e)},expression:"addOptions.tm_bk_SpecialPolicy"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"预订提醒:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_Remind,callback:function(e){t.$set(t.addOptions,"tm_bk_Remind",e)},expression:"addOptions.tm_bk_Remind"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"温馨提示:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_HappyNotice,callback:function(e){t.$set(t.addOptions,"tm_bk_HappyNotice",e)},expression:"addOptions.tm_bk_HappyNotice"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发票说明:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_TicketSay,callback:function(e){t.$set(t.addOptions,"tm_bk_TicketSay",e)},expression:"addOptions.tm_bk_TicketSay"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"退改规则:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_ReturnRule,callback:function(e){t.$set(t.addOptions,"tm_bk_ReturnRule",e)},expression:"addOptions.tm_bk_ReturnRule"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"特殊信息:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.tm_bk_SpecialMessage,callback:function(e){t.$set(t.addOptions,"tm_bk_SpecialMessage",e)},expression:"addOptions.tm_bk_SpecialMessage"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"修改预定须知",visible:t.updateDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(e){t.updateDialog=e}}},[i("el-form",{attrs:{model:t.updatePredeterminedInstructionsObj}},[i("el-form-item",{attrs:{label:"景点名称:","label-width":t.formLabelWidth}},[i("el-autocomplete",{attrs:{"fetch-suggestions":t.querySearchAsync,placeholder:"请输入景点名称"},on:{select:t.handleSelect},model:{value:t.tourName,callback:function(e){t.tourName=e},expression:"tourName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开放时间:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_OpenTime,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_OpenTime",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_OpenTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"特殊人群政策:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_SpecialPolicy,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_SpecialPolicy",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_SpecialPolicy"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"预订提醒:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_Remind,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_Remind",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_Remind"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"温馨提示:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_HappyNotice,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_HappyNotice",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_HappyNotice"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"发票说明:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_TicketSay,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_TicketSay",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_TicketSay"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"退改规则:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_ReturnRule,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_ReturnRule",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_ReturnRule"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"特殊信息:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updatePredeterminedInstructionsObj.tm_bk_SpecialMessage,callback:function(e){t.$set(t.updatePredeterminedInstructionsObj,"tm_bk_SpecialMessage",e)},expression:"updatePredeterminedInstructionsObj.tm_bk_SpecialMessage"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var l=i("VU/8")(n,r,!1,function(t){i("rRK5")},"data-v-4f7411e2",null);e.default=l.exports},OiIV:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.search[data-v-4f7411e2] {\n  margin: 20px;\n}\n",""])},rRK5:function(t,e,i){var a=i("OiIV");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("7e510f31",a,!0)}});