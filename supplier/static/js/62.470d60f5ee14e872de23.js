webpackJsonp([62],{BAUH:function(t,n,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},SGXG:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=i("SJI6"),a=i("iTKD"),o=i("jvWE"),s={name:"",props:["id"],components:{Editor:a.a},computed:Object(e.mapGetters)(["adminProductLine"]),data:function(){return{lineObj:{},tinymceHeight:800,addDialog:!1,formLabelWidth:"120px",isLoading:!1,addData:{},addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",data:{ts_pt_GoodsListID:"",ts_pt_ID:"",ts_pt_BookKnow:"",ts_pt_SafetyLimit:"",ts_pt_SpecialLimit:"",ts_pt_PayWay:"",ts_pt_LimitDuty:""}},updateOptions:{},updateDialog:!1}},created:function(){var t=sessionStorage.getItem("lineObj");t&&(this.lineObj=JSON.parse(t),this.initData(this.lineObj))},methods:{jump:function(t){var n=sessionStorage.getItem("MerchanID");n&&window.open("http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/"+n,"_blank")},cacheForm:function(){window.location.reload(),this.ImageURL=[],this.addDialog=!1},addAdminBookingInstructions:function(){for(var t in this.addOptions.data)this.addOptions.data[t]="";var n=document.querySelectorAll(".w-e-text");if(n&&n.length)for(var i=0;i<n.length;i++)n[i].innerHTML="";this.addDialog=!0},initData:function(t){var n=this,i={loginUserID:"huileyou",loginUserPass:123,isDelete:0,goodID:t.ts_pt_GoodsListID};this.isLoading=!0,this.$store.dispatch("initAdminProductLine",i).then(function(){n.isLoading=!1},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},addSubmit:function(){var t=this;this.addOptions.data.ts_pt_GoodsListID=this.lineObj.ts_pt_GoodsListID,this.addOptions.data.ts_pt_ID=this.id,this.$store.dispatch("UpdateAdminQueryProductInformation",this.addOptions).then(function(){t.$notify({message:"修改成功!",type:"success"}),t.initData(t.lineObj)},function(n){t.$notify({message:n,type:"error"})})},updateAdminBookingInstructions:function(t){this.updateOptions=t,this.updateDialog=!0},updateSubmit:function(){var t=this,n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",data:{ts_pt_GoodsListID:this.lineObj.ts_pt_GoodsListID,ts_pt_ID:this.id,ts_pt_BookKnow:Object(o.a)(this.updateOptions.ts_pt_BookKnow),ts_pt_SafetyLimit:Object(o.a)(this.updateOptions.ts_pt_SafetyLimit),ts_pt_SpecialLimit:Object(o.a)(this.updateOptions.ts_pt_SpecialLimit),ts_pt_PayWay:Object(o.a)(this.updateOptions.ts_pt_PayWay),ts_pt_LimitDuty:Object(o.a)(this.updateOptions.ts_pt_LimitDuty)}};this.$store.dispatch("UpdateAdminQueryProductInformation",n).then(function(){t.$notify({message:"修改成功!",type:"success"}),t.initData(t.lineObj)},function(n){t.$notify({message:n,type:"error"})}),this.updateDialog=!1}}},l={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("section",{attrs:{id:"wrap"}},[i("h1",{staticClass:"userClass"},[t._v("预订须知")]),t._v(" "),i("div",{staticStyle:{float:"right","padding-right":"30px"}},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addAdminBookingInstructions}},[t._v("新增")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.adminProductLine}},[i("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(n){return[i("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[i("el-form-item",{attrs:{label:"线路编号:"}},[i("span",[t._v(t._s(n.row.ts_pt_ID))])]),t._v(" "),i("el-form-item",{attrs:{label:"线路名称:"}},[i("span",[t._v(t._s(n.row.ts_pt_Name))])]),t._v(" "),i("el-form-item",{attrs:{label:"出行须知:"}},[i("div",{domProps:{innerHTML:t._s(n.row.ts_pt_BookKnow)}})]),t._v(" "),i("el-form-item",{attrs:{label:"特殊限制:"}},[i("div",{domProps:{innerHTML:t._s(n.row.ts_pt_SpecialLimit)}})]),t._v(" "),i("el-form-item",{attrs:{label:"付款方式:"}},[i("div",{domProps:{innerHTML:t._s(n.row.ts_pt_PayWay)}})]),t._v(" "),i("el-form-item",{attrs:{label:"违约责任:"}},[i("div",{domProps:{innerHTML:t._s(n.row.ts_pt_LimitDuty)}})]),t._v(" "),i("el-form-item",{attrs:{label:"安全提示:"}},[i("div",{domProps:{innerHTML:t._s(n.row.ts_pt_SafetyLimit)}})])],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"线路编号",prop:"ts_pt_ID"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"线路名称",prop:"ts_pt_Name"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[i("el-button",{attrs:{size:"mini"},on:{click:function(i){t.updateAdminBookingInstructions(n.row)}}},[t._v("修改\n          ")]),t._v(" "),i("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(i){t.jump(n.row)}}},[t._v("预览效果\n          ")])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:"添加预定须知",visible:t.addDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(n){t.addDialog=n}}},[i("el-form",{attrs:{model:t.addOptions}},[i("el-form-item",{attrs:{label:"出行须知:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.data.ts_pt_BookKnow,callback:function(n){t.$set(t.addOptions.data,"ts_pt_BookKnow",n)},expression:"addOptions.data.ts_pt_BookKnow"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"特殊限制:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.data.ts_pt_SpecialLimit,callback:function(n){t.$set(t.addOptions.data,"ts_pt_SpecialLimit",n)},expression:"addOptions.data.ts_pt_SpecialLimit"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"付款方式:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.data.ts_pt_PayWay,callback:function(n){t.$set(t.addOptions.data,"ts_pt_PayWay",n)},expression:"addOptions.data.ts_pt_PayWay"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"违约责任:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.data.ts_pt_LimitDuty,callback:function(n){t.$set(t.addOptions.data,"ts_pt_LimitDuty",n)},expression:"addOptions.data.ts_pt_LimitDuty"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"安全提示:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.addOptions.data.ts_pt_SafetyLimit,callback:function(n){t.$set(t.addOptions.data,"ts_pt_SafetyLimit",n)},expression:"addOptions.data.ts_pt_SafetyLimit"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(n){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"修改预定须知",visible:t.updateDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(n){t.updateDialog=n}}},[i("el-form",{attrs:{model:t.updateOptions}},[i("el-form-item",{attrs:{label:"出行须知:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updateOptions.ts_pt_BookKnow,callback:function(n){t.$set(t.updateOptions,"ts_pt_BookKnow",n)},expression:"updateOptions.ts_pt_BookKnow"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"特殊限制:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updateOptions.ts_pt_SpecialLimit,callback:function(n){t.$set(t.updateOptions,"ts_pt_SpecialLimit",n)},expression:"updateOptions.ts_pt_SpecialLimit"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"付款方式:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updateOptions.ts_pt_PayWay,callback:function(n){t.$set(t.updateOptions,"ts_pt_PayWay",n)},expression:"updateOptions.ts_pt_PayWay"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"违约责任:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updateOptions.ts_pt_LimitDuty,callback:function(n){t.$set(t.updateOptions,"ts_pt_LimitDuty",n)},expression:"updateOptions.ts_pt_LimitDuty"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"安全提示:","label-width":t.formLabelWidth}},[i("editor",{model:{value:t.updateOptions.ts_pt_SafetyLimit,callback:function(n){t.$set(t.updateOptions,"ts_pt_SafetyLimit",n)},expression:"updateOptions.ts_pt_SafetyLimit"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(n){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var d=i("VU/8")(s,l,!1,function(t){i("Tgiu")},"data-v-2c3afda8",null);n.default=d.exports},Tgiu:function(t,n,i){var e=i("BAUH");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i("rjj0")("80722402",e,!0)}});