webpackJsonp([59],{BK9B:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("NYxO"),s={name:"",props:["id"],components:{Tinymce:e("gLRK").a},computed:Object(i.b)(["adminProductLine"]),data:function(){return{lineObj:{},tinymceHeight:800,addDialog:!1,formLabelWidth:"120px",isLoading:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",data:{ts_pt_GoodsListID:"",ts_pt_ID:"",ts_pt_ReturnRule:"",ts_pt_FeeIn:"",ts_pt_FeeNotIn:""}},updateOptions:{},updateDialog:!1}},created:function(){var n=sessionStorage.getItem("lineObj");n&&(this.lineObj=JSON.parse(n),this.initData(this.lineObj)),"预订须知"!==sessionStorage.getItem("AdminQueryProductInformationListName")&&sessionStorage.setItem("AdminQueryProductInformationListName","费用说明")},methods:{cacheForm:function(){this.addDialog=!1,window.location.reload()},jump:function(n){var t=sessionStorage.getItem("MerchanID");t&&window.open("http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/"+t,"_blank")},addAdminCostDescription:function(){for(var n in this.addOptions.data)this.addOptions.data[n]="";this.addDialog=!0},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:123,isDelete:0,goodID:n.ts_pt_GoodsListID};this.isLoading=!0,this.$store.dispatch("initAdminProductLine",e).then(function(){t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})}),this.addDialog=!1},addSubmit:function(){var n=this;this.addOptions.data.ts_pt_GoodsListID=this.lineObj.ts_pt_GoodsListID,this.addOptions.data.ts_pt_ID=this.id,this.$store.dispatch("UpdateAdminQueryProductInformation",this.addOptions).then(function(){n.$notify({message:"修改成功!",type:"success"}),window.location.reload()},function(t){n.$notify({message:t,type:"error"})})},updateAdminCostDescription:function(n){this.updateOptions=n,this.updateDialog=!0},updateSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",data:{ts_pt_GoodsListID:this.lineObj.ts_pt_GoodsListID,ts_pt_ID:this.id,ts_pt_ReturnRule:this.updateOptions.ts_pt_ReturnRule,ts_pt_FeeIn:this.updateOptions.ts_pt_FeeIn,ts_pt_FeeNotIn:this.updateOptions.ts_pt_FeeNotIn}};this.$store.dispatch("UpdateAdminQueryProductInformation",t).then(function(){n.$notify({message:"修改成功!",type:"success"}),n.initData(n.lineObj)},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1}}},a={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("section",{attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("费用说明")]),n._v(" "),e("div",{staticStyle:{float:"right","padding-right":"30px"}},[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.addAdminCostDescription}},[n._v("新增")])],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminProductLine}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"线路编号:"}},[e("span",[n._v(n._s(t.row.ts_pt_ID))])]),n._v(" "),e("el-form-item",{attrs:{label:"线路名称:"}},[e("span",[n._v(n._s(t.row.ts_pt_Name))])]),n._v(" "),e("el-form-item",{attrs:{label:"退改政策:"}},[e("div",{domProps:{innerHTML:n._s(t.row.ts_pt_ReturnRule)}})]),n._v(" "),e("el-form-item",{attrs:{label:"费用包含:"}},[e("div",{domProps:{innerHTML:n._s(t.row.ts_pt_FeeIn)}})]),n._v(" "),e("el-form-item",{attrs:{label:"费用不包含:"}},[e("div",{domProps:{innerHTML:n._s(t.row.ts_pt_FeeNotIn)}})])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"线路编号",prop:"ts_pt_ID"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"线路名称",prop:"ts_pt_Name"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){n.updateAdminCostDescription(t.row)}}},[n._v("修改\n          ")]),n._v(" "),e("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){n.jump(t.row)}}},[n._v("预览效果\n          ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加费用说明",visible:n.addDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"退改政策:","label-width":n.formLabelWidth}},[e("tinymce",{attrs:{height:n.tinymceHeight},model:{value:n.addOptions.data.ts_pt_ReturnRule,callback:function(t){n.$set(n.addOptions.data,"ts_pt_ReturnRule",t)},expression:"addOptions.data.ts_pt_ReturnRule"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"费用包含:","label-width":n.formLabelWidth}},[e("tinymce",{attrs:{height:n.tinymceHeight},model:{value:n.addOptions.data.ts_pt_FeeIn,callback:function(t){n.$set(n.addOptions.data,"ts_pt_FeeIn",t)},expression:"addOptions.data.ts_pt_FeeIn"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"费用不包含:","label-width":n.formLabelWidth}},[e("tinymce",{attrs:{height:n.tinymceHeight},model:{value:n.addOptions.data.ts_pt_FeeNotIn,callback:function(t){n.$set(n.addOptions.data,"ts_pt_FeeNotIn",t)},expression:"addOptions.data.ts_pt_FeeNotIn"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:n.cacheForm}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改费用说明",visible:n.updateDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateOptions}},[e("el-form-item",{attrs:{label:"退改政策:","label-width":n.formLabelWidth}},[e("tinymce",{attrs:{height:n.tinymceHeight},model:{value:n.updateOptions.ts_pt_ReturnRule,callback:function(t){n.$set(n.updateOptions,"ts_pt_ReturnRule",t)},expression:"updateOptions.ts_pt_ReturnRule"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"费用包含:","label-width":n.formLabelWidth}},[e("tinymce",{attrs:{height:n.tinymceHeight},model:{value:n.updateOptions.ts_pt_FeeIn,callback:function(t){n.$set(n.updateOptions,"ts_pt_FeeIn",t)},expression:"updateOptions.ts_pt_FeeIn"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"费用不包含:","label-width":n.formLabelWidth}},[e("tinymce",{attrs:{height:n.tinymceHeight},model:{value:n.updateOptions.ts_pt_FeeNotIn,callback:function(t){n.$set(n.updateOptions,"ts_pt_FeeNotIn",t)},expression:"updateOptions.ts_pt_FeeNotIn"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var o=e("VU/8")(s,a,!1,function(n){e("OSS1")},"data-v-92b4d806",null);t.default=o.exports},OSS1:function(n,t,e){var i=e("VFTH");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("b1361542",i,!0)},VFTH:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});