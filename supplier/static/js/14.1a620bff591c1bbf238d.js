webpackJsonp([14],{HomB:function(t,e,a){var i=a("euNg");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("ce913be4",i,!0)},euNg:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap[data-v-aef7e61e] {\n}\n.imgWap span[data-v-aef7e61e] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-aef7e61e] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},mMSC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,l=a("bOdI"),o=a.n(l),s=a("NYxO"),n=(a("jvWE"),{components:{Upload:a("TAej").a},computed:Object(s.b)(["ticketTypeList","ticketAttractionsList","updateTicketTypeObj"]),data:function(){return{imageObj:{accept:"image/*"},tourName:"",isShow:!1,updateImageURL:[],ImageURL:[],isLoading:!1,updateDialog:!1,loginId:"",siteId:"",total:0,addBeforeTime:"",updateBeforeTime:"",isUploaNode:!0,addDialog:!1,isNewUploaNode:!0,formLabelWidth:"120px",addOptions:{tm_ts_Code:"",tm_tt_Name:"",tm_tt_TradeInfoID:"",tm_tt_HelpCode:"",tm_tt_Image:"",tm_tt_Description:"",tm_tt_ExpireDay:"",tm_tt_BeforeTime:"",tm_tt_Remark:"",tm_tt_TicketPrice:"",tm_tt_RealPrice:"",tm_tt_typeName:"",tm_tt_ReturnRule:"",tm_tt_UseMethod:"",tm_tt_GetTime:"",tm_tt_GetAddress:"",tm_tt_AddRemarks:"",tm_tt_PriceInclude:"",tm_tt_ImportantCause:"",tm_tt_EffectiveTime:"",tm_tt_SuitableCrowd:"",tm_tt_SpecialNotice:"",tm_tt_BookLimit:"",tm_tt_HappyNotice:"",tm_tt_PreferentialPolicy:"",tm_tt_ByeNotice:""},radioIndex:0,addRadioIndex:0,arr:[{value:"成人票"},{value:"儿童票"}],tm_ts_Code:"",restaurants1:[{value:"电子票"}]}},methods:(i={querySearch1:function(t,e){var a=this.restaurants1;e(t?a.filter(this.createFilter(t)):a)},createFilter:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},handleSelect1:function(){},jump:function(t){sessionStorage.setItem("code",t.tm_ts_Code),window.open("http://hly.1000da.com.cn/index.html#/Comment/ticketsDetail/"+t.tm_ts_Code,"_blank")},querySearchTicket:function(t,e){var a=this.arr;e(t?a.filter(this.createFilter(t)):a)}},o()(i,"createFilter",function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}}),o()(i,"addHandleSelect",function(t){this.addOptions.tm_tt_Name=t.value}),o()(i,"getData",function(t){this.addRadioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.addRadioIndex=""):this.ImageURL.push(t.data)}),o()(i,"updateImage",function(t){this.radioIndex?(this.updateImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.updateImageURL.push(t.data)}),o()(i,"toTicketTypeTicketPrice",function(t){this.$router.push({name:"TicketTypeTicketPrice",params:{id:t}})}),o()(i,"handleSelect",function(t){this.addOptions.tm_ts_Code=t.id,this.updateTicketTypeObj.tm_ts_Code=t.id,this.tm_ts_Code=t.id}),o()(i,"loadAll",function(t,e){var a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:e,tm_ts_TradeInfoID:this.loginId.sm_ui_ID,tm_ts_IsDelete:0,tm_ts_IsPass:"",tm_ts_ShowTop:"",tm_ts_IsHot:"",tm_ts_ThemeTypeID:""};return this.$store.dispatch("initSearchTicketAttractions",a)}),o()(i,"querySearchAsync",function(t,e){var a=this;this.loadAll(1,t).then(function(t){t=t.map(function(t){return{id:t.tm_ts_Code,value:t.tm_ts_Name}}),a.restaurants=t,clearTimeout(a.timeout),a.timeout=setTimeout(function(){e(a.restaurants)},10)})}),o()(i,"deleteUpdateImageURL",function(t){this.isNewUploaNode=!1,this.updateImageURL=this.updateImageURL.filter(function(e){return e!=t})}),o()(i,"deleteImageURL",function(t){this.isUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})}),o()(i,"closeDialog",function(){this.ImageURL=[],this.updateImageURL=[],this.addDialog=!1,this.updateDialog=!1}),o()(i,"cacheForm",function(){this.ImageURL=[],this.updateImageURL=[],this.addDialog=!1,this.updateDialog=!1}),o()(i,"initTicketAttraction",function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:"",tm_ts_TradeInfoID:this.loginId.sm_ui_ID,tm_ts_IsDelete:0,tm_ts_IsPass:"",tm_ts_ShowTop:"",tm_ts_IsHot:"",tm_ts_ThemeTypeID:""};this.$store.dispatch("initTicketAttractions",t)}),o()(i,"handleCurrentChange",function(t){this.initData("",t)}),o()(i,"initData",function(t,e){var a=this,i={loginUserID:"huileyou",loginUserPass:"123",tm_ts_Code:t||"",tm_tt_TradeInfoID:this.loginId.sm_ui_ID,tm_tt_IsDelete:0,page:e||1,rows:5};this.isLoading=!0,this.$store.dispatch("initTicketType",i).then(function(t){a.total=t,a.isLoading=!1},function(t){a.$notify({message:t,type:"error"})})}),o()(i,"search",function(){this.tm_ts_Code?this.initData(this.tm_ts_Code):this.initData("")}),o()(i,"Add",function(){for(var t in this.addOptions)this.addOptions[t]="";this.ImageURL=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0}),o()(i,"addSubmit",function(){var t=this;this.addOptions.tm_tt_TradeInfoID=this.loginId.sm_ui_ID,this.addOptions.tm_tt_Image=this.ImageURL.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",data:this.addOptions};this.$store.dispatch("addTicketTypeSubmit",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1}),o()(i,"update",function(t){var e=this;this.$store.commit("setTranstionFalse"),this.$store.commit("updateTicketType",t),setTimeout(function(){e.updateTicketTypeObj.tm_tt_Image.length&&(e.updateImageURL=e.updateTicketTypeObj.tm_tt_Image),e.updateDialog=!0},30),this.tourName=this.updateTicketTypeObj.tm_ts_Name}),o()(i,"updateSubmit",function(){var t=this;this.updateImageURL.length?this.updateTicketTypeObj.tm_tt_Image=this.updateImageURL.join(","):this.updateTicketTypeObj.tm_tt_Image="";var e={loginUserID:"huileyou",loginUserPass:"123",data:this.updateTicketTypeObj};this.$store.dispatch("updateTicketTypeSubmit",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1}),o()(i,"deleteTicketType",function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",data:{tm_tt_ID:t}};this.$store.dispatch("deleteTicketType",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})})}),i),created:function(){this.loginId=JSON.parse(sessionStorage.getItem("admin")),this.initTicketAttraction(),this.initData()}}),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("票种")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("景点名称:")])]),t._v(" "),a("el-form-item",[a("el-autocomplete",{attrs:{size:"mini","fetch-suggestions":t.querySearchAsync,placeholder:"请输入景点名称"},on:{select:t.handleSelect},model:{value:t.tourName,callback:function(e){t.tourName=e},expression:"tourName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.ticketTypeList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"票种编码"}},[a("span",[t._v(t._s(e.row.tm_tt_ID))])]),t._v(" "),a("el-form-item",{attrs:{label:"景点名称"}},[a("span",[t._v(t._s(e.row.tm_ts_Name))])]),t._v(" "),a("el-form-item",{attrs:{label:"票种名称"}},[a("span",[t._v(t._s(e.row.tm_tt_Name))])]),t._v(" "),a("el-form-item",{attrs:{label:"商户编码"}},[a("span",[t._v(t._s(e.row.tm_tt_TradeInfoID))])]),t._v(" "),a("el-form-item",{attrs:{label:"票种图片"}},t._l(e.row.tm_tt_Image,function(t,e){return a("img",{key:e,staticStyle:{margin:"10px 15px"},attrs:{src:t,alt:"",width:"200",height:"100"}})})),t._v(" "),a("el-form-item",{attrs:{label:"描述"}},[a("span",[t._v(t._s(e.row.tm_tt_Description))])]),t._v(" "),a("el-form-item",{attrs:{label:"允许超过天数"}},[a("span",[t._v(t._s(e.row.tm_tt_ExpireDay)+"天")])]),t._v(" "),a("el-form-item",{attrs:{label:"票价"}},[a("span",[t._v(t._s(e.row.tm_tt_TicketPrice)+"元")])]),t._v(" "),a("el-form-item",{attrs:{label:"实际价格"}},[a("span",[t._v(t._s(e.row.tm_tt_RealPrice)+"元")])]),t._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("span",[t._v(t._s(e.row.tm_tt_Remark))])]),t._v(" "),a("el-form-item",{attrs:{label:"门票类型"}},[a("span",[t._v(t._s(e.row.tm_tt_typeName))])]),t._v(" "),a("el-form-item",{attrs:{label:"提前预定时间"}},[a("span",[t._v(t._s(e.row.tm_tt_BeforeTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"退改规则"}},[a("span",[t._v(t._s(e.row.tm_tt_ReturnRule))])]),t._v(" "),a("el-form-item",{attrs:{label:"使用方法"}},[a("span",[t._v(t._s(e.row.tm_tt_UseMethod))])]),t._v(" "),a("el-form-item",{attrs:{label:"取票时间"}},[a("span",[t._v(t._s(e.row.tm_tt_GetTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"取票地址"}},[a("span",[t._v(t._s(e.row.tm_tt_GetAddress))])]),t._v(" "),a("el-form-item",{attrs:{label:"补充说明"}},[a("span",[t._v(t._s(e.row.tm_tt_AddRemarks))])]),t._v(" "),a("el-form-item",{attrs:{label:"费用包含"}},[a("span",[t._v(t._s(e.row.tm_tt_PriceInclude))])]),t._v(" "),a("el-form-item",{attrs:{label:"重要条款"}},[a("span",[t._v(t._s(e.row.tm_tt_ImportantCause))])]),t._v(" "),a("el-form-item",{attrs:{label:"预订生效时间"}},[a("span",[t._v(t._s(e.row.tm_tt_EffectiveTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"适用人群"}},[a("span",[t._v(t._s(e.row.tm_tt_SuitableCrowd))])]),t._v(" "),a("el-form-item",{attrs:{label:"特别提示"}},[a("span",[t._v(t._s(e.row.tm_tt_SpecialNotice))])]),t._v(" "),a("el-form-item",{attrs:{label:"预订限制"}},[a("span",[t._v(t._s(e.row.tm_tt_BookLimit))])]),t._v(" "),a("el-form-item",{attrs:{label:"温馨提示"}},[a("span",[t._v(t._s(e.row.tm_tt_HappyNotice))])]),t._v(" "),a("el-form-item",{attrs:{label:"优待政策"}},[a("span",[t._v(t._s(e.row.tm_tt_PreferentialPolicy))])]),t._v(" "),a("el-form-item",{attrs:{label:"购票须知"}},[a("span",[t._v(t._s(e.row.tm_tt_ByeNotice))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"票种编码",prop:"tm_tt_ID"}}),t._v(" "),a("el-table-column",{attrs:{label:"票种名称",prop:"tm_tt_Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"景点名称",prop:"tm_ts_Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"实际价格",prop:"tm_tt_RealPrice"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"350",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.update(e.row.tm_tt_ID)}}},[t._v("修改\n          ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.deleteTicketType(e.row.tm_tt_ID)}}},[t._v("删除\n          ")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.toTicketTypeTicketPrice(e.row.tm_tt_ID)}}},[t._v("设置票价\n          ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"small"},on:{click:function(a){t.jump(e.row)}}},[t._v("预览效果\n          ")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"添加票种信息",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e},close:t.closeDialog}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"票种名称:","label-width":t.formLabelWidth}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearchTicket,placeholder:"请输入票种名称"},on:{select:t.addHandleSelect},model:{value:t.addOptions.tm_tt_Name,callback:function(e){t.$set(t.addOptions,"tm_tt_Name",e)},expression:"addOptions.tm_tt_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"景点名称:","label-width":t.formLabelWidth}},[a("el-autocomplete",{attrs:{"fetch-suggestions":t.querySearchAsync,placeholder:"请输入景点名称"},on:{select:t.handleSelect},model:{value:t.tourName,callback:function(e){t.tourName=e},expression:"tourName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"票种图片:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"30px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.addRadioIndex,callback:function(e){t.addRadioIndex=e},expression:"addRadioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"描述:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.addOptions.tm_tt_Description,callback:function(e){t.$set(t.addOptions,"tm_tt_Description",e)},expression:"addOptions.tm_tt_Description"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"允许超过天数:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入数字"},model:{value:t.addOptions.tm_tt_ExpireDay,callback:function(e){t.$set(t.addOptions,"tm_tt_ExpireDay",e)},expression:"addOptions.tm_tt_ExpireDay"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"提前预定时间:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_BeforeTime,callback:function(e){t.$set(t.addOptions,"tm_tt_BeforeTime",e)},expression:"addOptions.tm_tt_BeforeTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.addOptions.tm_tt_Remark,callback:function(e){t.$set(t.addOptions,"tm_tt_Remark",e)},expression:"addOptions.tm_tt_Remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"票价:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入数字"},model:{value:t.addOptions.tm_tt_TicketPrice,callback:function(e){t.$set(t.addOptions,"tm_tt_TicketPrice",e)},expression:"addOptions.tm_tt_TicketPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"实际价格:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入数字"},model:{value:t.addOptions.tm_tt_RealPrice,callback:function(e){t.$set(t.addOptions,"tm_tt_RealPrice",e)},expression:"addOptions.tm_tt_RealPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"门票类型:","label-width":t.formLabelWidth}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearch1,placeholder:"请输入门票类型"},on:{select:t.handleSelect1},model:{value:t.addOptions.tm_tt_typeName,callback:function(e){t.$set(t.addOptions,"tm_tt_typeName",e)},expression:"addOptions.tm_tt_typeName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"退改规则:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_ReturnRule,callback:function(e){t.$set(t.addOptions,"tm_tt_ReturnRule",e)},expression:"addOptions.tm_tt_ReturnRule"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"使用方法:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_UseMethod,callback:function(e){t.$set(t.addOptions,"tm_tt_UseMethod",e)},expression:"addOptions.tm_tt_UseMethod"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"取票时间:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_GetTime,callback:function(e){t.$set(t.addOptions,"tm_tt_GetTime",e)},expression:"addOptions.tm_tt_GetTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"取票地址:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_GetAddress,callback:function(e){t.$set(t.addOptions,"tm_tt_GetAddress",e)},expression:"addOptions.tm_tt_GetAddress"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"补充说明:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_AddRemarks,callback:function(e){t.$set(t.addOptions,"tm_tt_AddRemarks",e)},expression:"addOptions.tm_tt_AddRemarks"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"费用包含:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_PriceInclude,callback:function(e){t.$set(t.addOptions,"tm_tt_PriceInclude",e)},expression:"addOptions.tm_tt_PriceInclude"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"重要条款:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_ImportantCause,callback:function(e){t.$set(t.addOptions,"tm_tt_ImportantCause",e)},expression:"addOptions.tm_tt_ImportantCause"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"预订生效时间:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_EffectiveTime,callback:function(e){t.$set(t.addOptions,"tm_tt_EffectiveTime",e)},expression:"addOptions.tm_tt_EffectiveTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"适用人群:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_SuitableCrowd,callback:function(e){t.$set(t.addOptions,"tm_tt_SuitableCrowd",e)},expression:"addOptions.tm_tt_SuitableCrowd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"特别提示:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_SpecialNotice,callback:function(e){t.$set(t.addOptions,"tm_tt_SpecialNotice",e)},expression:"addOptions.tm_tt_SpecialNotice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"预订限制:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_BookLimit,callback:function(e){t.$set(t.addOptions,"tm_tt_BookLimit",e)},expression:"addOptions.tm_tt_BookLimit"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"温馨提示:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_HappyNotice,callback:function(e){t.$set(t.addOptions,"tm_tt_HappyNotice",e)},expression:"addOptions.tm_tt_HappyNotice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"优待政策:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_PreferentialPolicy,callback:function(e){t.$set(t.addOptions,"tm_tt_PreferentialPolicy",e)},expression:"addOptions.tm_tt_PreferentialPolicy"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"购票须知:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.tm_tt_ByeNotice,callback:function(e){t.$set(t.addOptions,"tm_tt_ByeNotice",e)},expression:"addOptions.tm_tt_ByeNotice"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cacheForm}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改票种信息",visible:t.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.updateDialog=e},close:t.closeDialog}},[a("el-form",{attrs:{model:t.updateTicketTypeObj}},[a("el-form-item",{attrs:{label:"票种名称:","label-width":t.formLabelWidth}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearchTicket,placeholder:"请输入票种名称"},on:{select:t.addHandleSelect},model:{value:t.updateTicketTypeObj.tm_tt_Name,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_Name",e)},expression:"updateTicketTypeObj.tm_tt_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"景点名称:","label-width":t.formLabelWidth}},[a("el-autocomplete",{attrs:{"fetch-suggestions":t.querySearchAsync,placeholder:"请输入景点名称"},on:{select:t.handleSelect},model:{value:t.tourName,callback:function(e){t.tourName=e},expression:"tourName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"票种图片:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.updateImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"30px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.updateImageURL.length,expression:"updateImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"描述:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.updateTicketTypeObj.tm_tt_Description,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_Description",e)},expression:"updateTicketTypeObj.tm_tt_Description"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"允许超过天数:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入数字"},model:{value:t.updateTicketTypeObj.tm_tt_ExpireDay,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_ExpireDay",e)},expression:"updateTicketTypeObj.tm_tt_ExpireDay"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"提前预定时间:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_BeforeTime,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_BeforeTime",e)},expression:"updateTicketTypeObj.tm_tt_BeforeTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.updateTicketTypeObj.tm_tt_Remark,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_Remark",e)},expression:"updateTicketTypeObj.tm_tt_Remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"票价:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入数字"},model:{value:t.updateTicketTypeObj.tm_tt_TicketPrice,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_TicketPrice",e)},expression:"updateTicketTypeObj.tm_tt_TicketPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"实际价格:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入数字"},model:{value:t.updateTicketTypeObj.tm_tt_RealPrice,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_RealPrice",e)},expression:"updateTicketTypeObj.tm_tt_RealPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"门票类型:","label-width":t.formLabelWidth}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearch1,placeholder:"请输入门票类型"},on:{select:t.handleSelect1},model:{value:t.updateTicketTypeObj.tm_tt_typeName,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_typeName",e)},expression:"updateTicketTypeObj.tm_tt_typeName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"退改规则:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_ReturnRule,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_ReturnRule",e)},expression:"updateTicketTypeObj.tm_tt_ReturnRule"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"使用方法:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_UseMethod,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_UseMethod",e)},expression:"updateTicketTypeObj.tm_tt_UseMethod"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"取票时间:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_GetTime,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_GetTime",e)},expression:"updateTicketTypeObj.tm_tt_GetTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"取票地址:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_GetAddress,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_GetAddress",e)},expression:"updateTicketTypeObj.tm_tt_GetAddress"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"补充说明:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_AddRemarks,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_AddRemarks",e)},expression:"updateTicketTypeObj.tm_tt_AddRemarks"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"费用包含:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_PriceInclude,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_PriceInclude",e)},expression:"updateTicketTypeObj.tm_tt_PriceInclude"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"重要条款:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_ImportantCause,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_ImportantCause",e)},expression:"updateTicketTypeObj.tm_tt_ImportantCause"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"预订生效时间:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_EffectiveTime,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_EffectiveTime",e)},expression:"updateTicketTypeObj.tm_tt_EffectiveTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"适用人群:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_SuitableCrowd,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_SuitableCrowd",e)},expression:"updateTicketTypeObj.tm_tt_SuitableCrowd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"特别提示:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_SpecialNotice,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_SpecialNotice",e)},expression:"updateTicketTypeObj.tm_tt_SpecialNotice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"预订限制:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_BookLimit,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_BookLimit",e)},expression:"updateTicketTypeObj.tm_tt_BookLimit"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"温馨提示:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_HappyNotice,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_HappyNotice",e)},expression:"updateTicketTypeObj.tm_tt_HappyNotice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"优待政策:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_PreferentialPolicy,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_PreferentialPolicy",e)},expression:"updateTicketTypeObj.tm_tt_PreferentialPolicy"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"购票须知:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateTicketTypeObj.tm_tt_ByeNotice,callback:function(e){t.$set(t.updateTicketTypeObj,"tm_tt_ByeNotice",e)},expression:"updateTicketTypeObj.tm_tt_ByeNotice"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cacheForm}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var m=a("VU/8")(n,r,!1,function(t){a("HomB")},"data-v-aef7e61e",null);e.default=m.exports}});