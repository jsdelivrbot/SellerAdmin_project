webpackJsonp([58],{"/nYJ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("//Fk"),n=a.n(i),r=a("NYxO"),s=(a("jvWE"),{name:"",props:["id"],components:{Tinymce:a("gLRK").a},data:function(){return{isUploaNode:!0,options:[],updateActivityContentObj:{},addActivityContentDialog:!1,updateActivityContentDialog:!1,activityContent:"",GoodId:"",LineID:"",userName:"",ImageURL:[],ImageURL2:[],isLoading:!1,userSearchID:"",formLabelWidth:"120px",addAdminLinePrepareDialog:!1,updateAdminLinePrepareDialog:!1,updateAdminLinePrepareObj:{},imageObj:{accept:"image/*"},addRadioIndex:0,addActiveIndex:0,updateActiveIndex:0}},computed:Object(r.b)(["adminTradeGoodList","adminProductLine","adminQueryProductList","adminLinePrepare"]),methods:{jump:function(e){var t=sessionStorage.getItem("MerchanID");t&&window.open("http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/"+t,"_blank")},closeDialog:function(){this.updateAdminLinePrepareDialog=!1},cacheForm:function(){this.updateAdminLinePrepareDialog=!1},selectInitData:function(e,t){var a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",ts_gi_GoodID:e,ts_gi_ParentID:t||""};return this.$store.dispatch("initSelectInitAllData",a)},handleSelect:function(e){this.userName=e.value;var t={loginUserID:"huileyou",loginUserPass:123,goodID:e.id?e.id:""};this.$store.dispatch("initAdminProductLine",t)},loadAll:function(e,t){var a=this;return new n.a(function(e,i){var n=JSON.parse(sessionStorage.getItem("admin")),r={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:n.sm_ui_ID?n.sm_ui_ID:"",goodTitle:t||"",userID:"",pcName:"",ID:"",isDelete:0,page:1,rows:40};a.$store.dispatch("initAdminTradeGoodList",r).then(function(t){e(t)},function(e){a.$notify({message:e,type:"error"})})})},querySearchAsync:function(e,t){var a=this;this.loadAll(1,e).then(function(e){e=(e=e.data).map(function(e){return{id:e.ta_tg_ID,value:e.ta_tg_Title}}),a.restaurants=e,clearTimeout(a.timeout),a.timeout=setTimeout(function(){t(a.restaurants)},10)})},initData:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:e||""};this.isLoading=!0,this.$store.dispatch("initAdminLinePrepare",a).then(function(){t.isLoading=!1},function(e){t.$notify({message:e,type:"error"})})},search:function(){this.userSearchID?this.initData(this.userSearchID):this.$notify({message:"请选择筛选条件",type:"error"})},searchInitData:function(){this.id&&this.initData(this.id)},updateAdminLinePrepare:function(e){this.updateAdminLinePrepareObj=e,this.updateAdminLinePrepareDialog=!0},updateAdminLinePrepareSubmit:function(){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_ID:this.updateAdminLinePrepareObj.ts_pt_ID,ts_pt_Content:this.updateAdminLinePrepareObj.ts_pt_Content,ts_pt_Name:this.updateAdminLinePrepareObj.ts_pt_Name,ts_pt_Remark:this.updateAdminLinePrepareObj.ts_pt_Remark}};this.$store.dispatch("UpdateAdminLinePrepare",t).then(function(){e.$notify({message:"修改成功!",type:"success"}),e.initData(e.updateAdminLinePrepareObj.ts_pt_Product_LineID)},function(t){e.$notify({message:t,type:"error"})}),this.updateAdminLinePrepareDialog=!1},deleteAdminLinePrepare:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",ID:e};this.$store.dispatch("DeleteAdminLinePrepare",a).then(function(){t.$notify({message:"删除成功!",type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})})},scheduleTimeManagement:function(e){this.$store.commit("adminScheduleTimeManagementId",e),this.$router.push({name:"AdminScheduleTime"}),sessionStorage.setItem("index","3")}},created:function(){for(var e=1;e<21;e++)this.options.push({value:e});this.initData(this.id)},mounted:function(){this.searchInitData()}}),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("section",{attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[e._v("线路日程信息")]),e._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[e._v("线路日程筛选:")])]),e._v(" "),a("el-form-item",[a("el-autocomplete",{staticStyle:{width:"250px"},attrs:{size:"small","fetch-suggestions":e.querySearchAsync,placeholder:"请选择产品"},on:{select:e.handleSelect},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择产品线路",size:"small"},model:{value:e.userSearchID,callback:function(t){e.userSearchID=t},expression:"userSearchID"}},e._l(e.adminProductLine,function(e){return a("el-option",{key:e.ts_pt_ID,attrs:{label:e.ts_pt_Name,value:e.ts_pt_ID}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:e.adminLinePrepare,"highlight-current-row":""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"主键编号:"}},[a("span",[e._v(e._s(t.row.ts_pt_ID))])]),e._v(" "),a("el-form-item",{attrs:{label:"线路编号:"}},[a("span",[e._v(e._s(t.row.ts_pt_Product_LineID))])]),e._v(" "),a("el-form-item",{attrs:{label:"日程名称:"}},[a("span",[e._v(e._s(t.row.ts_pt_Name))])]),e._v(" "),a("el-form-item",{attrs:{label:"第几天日程:"}},[a("span",[e._v(e._s(t.row.ts_pt_Day))])]),e._v(" "),a("el-form-item",{attrs:{label:"线路日程详情:"}},[a("div",{domProps:{innerHTML:e._s(t.row.ts_pt_Content)}})])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"主键编号",prop:"ts_pt_ID",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"线路编号",align:"center",prop:"ts_pt_Product_LineID"}}),e._v(" "),a("el-table-column",{attrs:{label:"日程名称",align:"center",prop:"ts_pt_Name"}}),e._v(" "),a("el-table-column",{attrs:{label:"第几天日程",align:"center",prop:"ts_pt_Day"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{ref:"popover1",attrs:{placement:"top-start",trigger:"hover",content:t.row.ts_pt_Remark}}),e._v(" "),a("el-button",{directives:[{name:"popover",rawName:"v-popover:popover1",arg:"popover1"}],attrs:{size:"small"}},[e._v("移入查看")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.updateAdminLinePrepare(t.row)}}},[e._v("修改\n          ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.deleteAdminLinePrepare(t.row.ts_pt_ID)}}},[e._v("删除\n          ")]),e._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){e.jump(t.row)}}},[e._v("预览效果\n          ")])]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"修改线路日程",visible:e.updateAdminLinePrepareDialog,"close-on-click-modal":!1,width:"70%"},on:{"update:visible":function(t){e.updateAdminLinePrepareDialog=t},close:e.closeDialog}},[a("el-form",{attrs:{model:e.updateAdminLinePrepareObj}},[a("el-form-item",{attrs:{label:"日程名称:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入日程名称"},model:{value:e.updateAdminLinePrepareObj.ts_pt_Name,callback:function(t){e.$set(e.updateAdminLinePrepareObj,"ts_pt_Name",t)},expression:"updateAdminLinePrepareObj.ts_pt_Name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"线路日程详情:","label-width":e.formLabelWidth}},[a("tinymce",{attrs:{height:1e3},model:{value:e.updateAdminLinePrepareObj.ts_pt_Content,callback:function(t){e.$set(e.updateAdminLinePrepareObj,"ts_pt_Content",t)},expression:"updateAdminLinePrepareObj.ts_pt_Content"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:e.updateAdminLinePrepareObj.ts_pt_Remark,callback:function(t){e.$set(e.updateAdminLinePrepareObj,"ts_pt_Remark",t)},expression:"updateAdminLinePrepareObj.ts_pt_Remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cacheForm}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateAdminLinePrepareSubmit}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(s,o,!1,function(e){a("UnMR")},"data-v-ffea9ae6",null);t.default=l.exports},DahJ:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.imgWap span[data-v-ffea9ae6] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-ffea9ae6] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},UnMR:function(e,t,a){var i=a("DahJ");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("2bd831ab",i,!0)}});