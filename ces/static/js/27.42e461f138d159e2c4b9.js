webpackJsonp([27],{"8fYo":function(t,n,e){var a=e("P1DG");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("bc4f5242",a,!0)},OvIQ:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("SJI6"),i={computed:Object(a.mapGetters)(["ticketAttractionsList","ticketTypeList","ticketTypeTicketPriceList"]),data:function(){return{searchTime:"",loginId:"",isLoading:!1,scenicNumber:"",ticketTypeNumber:"",total:0,addDialog:!1,formLabelWidth:"120px",addOptions:{tm_tt_ID:"",tm_tp_Limit:"",createFrom:"",createTo:""},deleteDialog:!1,deleteOptions:{tm_tt_ID:"",dateFrom:"",dateTo:""}}},methods:{jump:function(){var t=sessionStorage.getItem("code");window.open("http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/"+t,"_blank")},handleCurrentChange:function(t){this.initData(this.ticketTypeNumber,t)},initTicketAttraction:function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:"",tm_ts_TradeInfoID:this.loginId.sm_ui_ID,tm_ts_IsDelete:0,tm_ts_IsPass:"",tm_ts_ShowTop:"",tm_ts_IsHot:"",tm_ts_ThemeTypeID:"",page:1,rows:1e3};this.$store.dispatch("initTicketAttractions",t)},initData:function(t,n){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_tt_ID:t||"",dateFrom:this.searchTime?this.searchTime:"",page:n||1,rows:5};this.isLoading=!0,this.$store.dispatch("initTicketTypeTicketPrice",a).then(function(t){e.isLoading=!1,e.total=t},function(t){e.$notify({message:t,type:"error"})})},search:function(){this.initData(this.ticketTypeNumber)},Add:function(){for(var t in this.addOptions)this.addOptions[t]="";this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this,n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addTicketTypeTicketPriceSubmit",n).then(function(n){t.$notify({message:n,type:"success"}),t.initData(t.addOptions.tm_tt_ID)},function(n){t.$notify({message:n,type:"error"})}),this.addDialog=!1},deleteBtn:function(){this.$store.commit("setTranstionFalse"),this.deleteDialog=!0},deleteSubmit:function(){var t=this,n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_tt_ID:this.deleteOptions.tm_tt_ID,dateFrom:this.deleteOptions.dateFrom,dateTo:this.deleteOptions.dateTo};this.$store.dispatch("deleteTicketTypeTicketPriceSubmit",n).then(function(n){t.$notify({message:n,type:"success"}),t.initData(t.ticketTypeNumber)},function(n){t.$notify({message:n,type:"error"})}),this.deleteDialog=!1}},created:function(){this.ticketTypeNumber=this.$route.params.id,this.loginId=JSON.parse(sessionStorage.getItem("admin")),this.initData(this.ticketTypeNumber)}},s={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[t._v("票种_票价信息")]),t._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[t._v("票种编码筛选:")])]),t._v(" "),e("el-form-item",[e("div",{staticClass:"block"},[e("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择日期(默认为本月)","value-format":"yyyy-MM-dd"},model:{value:t.searchTime,callback:function(n){t.searchTime=n},expression:"searchTime"}})],1)]),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.search}},[t._v("查询")]),t._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.Add}},[t._v("新增")]),t._v(" "),e("el-button",{attrs:{type:"success",size:"mini"},on:{click:t.jump}},[t._v("预览效果\n          ")]),t._v(" "),e("el-button",{attrs:{type:"danger",size:"mini"},on:{click:t.deleteBtn}},[t._v("删除")])],1)],1)],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.ticketTypeTicketPriceList}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"票种票价编号"}},[e("span",[t._v(t._s(n.row.tm_tp_ID))])]),t._v(" "),e("el-form-item",{attrs:{label:"票种编号"}},[e("span",[t._v(t._s(n.row.tm_tt_ID))])]),t._v(" "),e("el-form-item",{attrs:{label:"票价"}},[e("span",[t._v(t._s(n.row.tm_tp_TicketPrice)+"元")])]),t._v(" "),e("el-form-item",{attrs:{label:"实际价格"}},[e("span",[t._v(t._s(n.row.tm_tp_RealPrice)+"元")])]),t._v(" "),e("el-form-item",{attrs:{label:"日期"}},[e("span",[t._v(t._s(n.row.tm_tp_Date))])]),t._v(" "),e("el-form-item",{attrs:{label:"限售张数"}},[e("span",[t._v(t._s(n.row.tm_tp_Limit)+"张")])])],1)]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"实际价格(元)",prop:"tm_tp_RealPrice"}}),t._v(" "),e("el-table-column",{attrs:{label:"限售张数(张)",prop:"tm_tp_Limit"}}),t._v(" "),e("el-table-column",{attrs:{label:"日期",prop:"tm_tp_Date"}})],1),t._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),e("el-dialog",{attrs:{title:"添加票种票价",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(n){t.addDialog=n}}},[e("el-form",{attrs:{model:t.addOptions}},[e("el-form-item",{attrs:{label:"票种编号:","label-width":t.formLabelWidth}},[e("el-select",{attrs:{placeholder:"如果没有数据先查询"},model:{value:t.addOptions.tm_tt_ID,callback:function(n){t.$set(t.addOptions,"tm_tt_ID",n)},expression:"addOptions.tm_tt_ID"}},t._l(t.ticketTypeList,function(t){return e("el-option",{key:t.tm_tt_ID,attrs:{label:t.tm_tt_Name,value:t.tm_tt_ID}})}))],1),t._v(" "),e("el-form-item",{attrs:{label:"限售张数:","label-width":t.formLabelWidth}},[e("el-input",{model:{value:t.addOptions.tm_tp_Limit,callback:function(n){t.$set(t.addOptions,"tm_tp_Limit",n)},expression:"addOptions.tm_tp_Limit"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"开始日期:","label-width":t.formLabelWidth}},[e("div",{staticClass:"block"},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择开始生产日期","value-format":"yyyy-MM-dd"},model:{value:t.addOptions.createFrom,callback:function(n){t.$set(t.addOptions,"createFrom",n)},expression:"addOptions.createFrom"}})],1)]),t._v(" "),e("el-form-item",{attrs:{label:"结束日期:","label-width":t.formLabelWidth}},[e("div",{staticClass:"block"},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择结束生成日期","value-format":"yyyy-MM-dd"},model:{value:t.addOptions.createTo,callback:function(n){t.$set(t.addOptions,"createTo",n)},expression:"addOptions.createTo"}})],1)])],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(n){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),e("el-dialog",{attrs:{title:"删除票种票价",visible:t.deleteDialog},on:{"update:visible":function(n){t.deleteDialog=n}}},[e("el-form",{attrs:{model:t.deleteOptions}},[e("el-form-item",{attrs:{label:"票种编号:","label-width":t.formLabelWidth}},[e("el-select",{attrs:{placeholder:"如果没有数据先查询"},model:{value:t.deleteOptions.tm_tt_ID,callback:function(n){t.$set(t.deleteOptions,"tm_tt_ID",n)},expression:"deleteOptions.tm_tt_ID"}},t._l(t.ticketTypeList,function(t){return e("el-option",{key:t.tm_tt_ID,attrs:{label:t.tm_tt_Name,value:t.tm_tt_ID}})}))],1),t._v(" "),e("el-form-item",{attrs:{label:"开始日期:","label-width":t.formLabelWidth}},[e("div",{staticClass:"block"},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择删除开始日期","value-format":"yyyy-MM-dd"},model:{value:t.deleteOptions.dateFrom,callback:function(n){t.$set(t.deleteOptions,"dateFrom",n)},expression:"deleteOptions.dateFrom"}})],1)]),t._v(" "),e("el-form-item",{attrs:{label:"结束日期:","label-width":t.formLabelWidth}},[e("div",{staticClass:"block"},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择删除结束日期","value-format":"yyyy-MM-dd"},model:{value:t.deleteOptions.dateTo,callback:function(n){t.$set(t.deleteOptions,"dateTo",n)},expression:"deleteOptions.dateTo"}})],1)])],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(n){t.deleteDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.deleteSubmit}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var o=e("VU/8")(i,s,!1,function(t){e("8fYo")},"data-v-483db056",null);n.default=o.exports},P1DG:function(t,n,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});