webpackJsonp([82],{"5kLq":function(n,a,e){var t=e("uGRC");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);e("rjj0")("3b0708a0",t,!0)},QCKl:function(n,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("//Fk"),s=e.n(t),i=e("NYxO"),l={name:"",data:function(){return{userInfo:{},loginUserID:"huileyou",isOff:!0,value:0,isShow:!0,isShow1:!0,ImageURL:[],ImageURL1:[],isLoading:!1,total:0,formLabelWidth:"120px",adApply:"",addDialog:!1,updateDialog:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{sm_aa_AdviertiseTypeID:"",sm_aa_LocationID:"",sm_aa_AgentID:this.userInfo,sm_aa_Image:"",sm_aa_Describe:"",sm_aa_ProductID:"",sm_aa_OperateCode:"",sm_aa_FailedReason:"",sm_aa_Remark:""}},passOptions:[{value:"3",label:"审核中"},{value:"1",label:"通过"},{value:"2",label:"不通过"}],updatePassOptions:[{value:"3",label:"审核中"},{value:"1",label:"通过"},{value:"2",label:"不通过"}]}},computed:Object(i.b)(["adTypeApplyAllList","adApplyList","updateAdApplyObj","adPositionAllList"]),created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")).sm_ai_AgentID,this.initData(),this.adPositionAll(),this.initAdTypeAllList()},methods:{initData:function(){var n=this,a={loginUserID:this.loginUserID,loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",sm_aa_ID:"",sm_aa_AdviertiseTypeID:"",sm_aa_LocationID:"",sm_aa_AgentID:"",sm_aa_Image:"",sm_aa_Describe:"",sm_aa_ProductID:"",sm_aa_CreateTime:"",sm_aa_PassState:"",sm_aa_PassTime:"",sm_aa_OperateCode:"",sm_aa_FailedReason:"",sm_aa_Remark:""};this.isLoading=!0,this.$store.dispatch("initAdApply",a).then(function(a){n.total=a,n.isLoading=!1},function(a){n.$notify({message:a,type:"error"})})},adPositionAll:function(){var n=this;this.$store.dispatch("initAdPositionAll",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",sm_pi_ID:"",sm_pi_LocationNo:"",sm_pi_MaxNo:"",sm_pi_Name:"",sm_pi_Remark:""}).then(function(a){n.total=a,n.isLoading=!1},function(a){n.$notify({message:a,type:"error"})})},initAdTypeAllList:function(){var n=this;this.$store.dispatch("initAdTypeAllList",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",sm_at_ID:"",sm_at_Name:"",sm_at_CreateTime:"",sm_at_Cost:"",sm_at_Remark:"",page:1,rows:10}).then(function(a){n.total=a,n.isLoading=!1},function(a){n.$notify({message:a,type:"error"})})},search:function(){this.initData()},Add:function(){var n=this.addOptions.data;for(var a in n)n[a]="";this.addDialog=!0,this.$store.commit("setTranstionFalse"),this.uploaNode()},addSubmit:function(){var n=this;this.addOptions.data.sm_aa_Image=this.ImageURL.join(","),this.$store.dispatch("AddAdApply",this.addOptions).then(function(a){n.$notify({message:a,type:"success"}),n.initData()},function(a){n.$notify({message:a,type:"error"})}),this.addDialog=!1},OnChange:function(){1==this.addOptions.data.sm_aa_PassState?this.isShow=!1:this.isShow=!0},OnChangeUpdate:function(){1==this.updateAdApplyObj.sm_aa_PassState?this.isShow1=!1:this.isShow1=!0},uploadImg:function(n){return new s.a(function(a,e){lrz(n).then(function(n){a(n.base64.split(",")[1])})})},uploaNode:function(){var n=this;this.ImageURL=[],this.ImageURL1=[],setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(a){for(var e=0;e<n.$refs.upload.files.length;e++)n.uploadImg(n.$refs.upload.files[e]).then(function(a){n.$store.dispatch("adApplyUploadAdminImgs",{imageData:a}).then(function(a){a?n.ImageURL.push(a.data):n.$notify({message:"图片地址不存在!",type:"error"})})})}),n.$refs.upload1&&n.$refs.upload1.addEventListener("change",function(a){for(var e=0;e<n.$refs.upload1.files.length;e++)n.uploadImg(n.$refs.upload1.files[e]).then(function(a){n.$store.dispatch("adApplyUploadAdminImgs",{imageData:a}).then(function(a){a?n.ImageURL1.push(a.data):n.$notify({message:"图片地址不存在!",type:"error"})})})})},30)},Update:function(n){this.updateDialog=!0,this.$store.commit("setTranstionFalse"),this.$store.commit("initUpdateAdApply",n),this.updateAdApplyObj.sm_aa_PassState="",this.uploaNode()},updateAdApplySubmit:function(){var n=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{sm_aa_ID:this.updateAdApplyObj.sm_aa_ID,sm_aa_AdviertiseTypeID:this.updateAdApplyObj.sm_aa_AdviertiseTypeID,sm_aa_LocationID:this.updateAdApplyObj.sm_aa_LocationID,sm_aa_AgentID:this.userInfo,sm_aa_Image:this.updateAdApplyObj.sm_aa_Image,sm_aa_Describe:this.updateAdApplyObj.sm_aa_Describe,sm_aa_ProductID:this.updateAdApplyObj.sm_aa_ProductID,sm_aa_PassState:this.updateAdApplyObj.sm_aa_PassState,sm_aa_OperateCode:this.updateAdApplyObj.sm_aa_OperateCode,sm_aa_FailedReason:this.updateAdApplyObj.sm_aa_FailedReason,sm_aa_Remark:this.updateAdApplyObj.sm_aa_Remark}};a.data.sm_aa_Image=this.ImageURL1.join(","),this.$store.dispatch("UpdateAdApplyObj",a).then(function(a){n.$notify({message:a,type:"success"}),n.initData(n.adApply)},function(a){n.$notify({message:a,type:"error"})}),this.updateDialog=!1},Delete:function(n){var a=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{sm_aa_ID:n}};this.$store.dispatch("DeleteAdApply",e).then(function(n){a.$notify({message:n,type:"success"}),a.initData(a.adApply)},function(n){a.$notify({message:n,type:"error"})})}}},o={render:function(){var n=this,a=n.$createElement,e=n._self._c||a;return e("div",[e("section",{attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("广告申请管理")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.Add}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adApplyList}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(a){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"申请广告编码"}},[e("span",[n._v(n._s(a.row.sm_aa_ID))])]),n._v(" "),e("el-form-item",{attrs:{label:"位置信息编码"}},[e("span",[n._v(n._s(a.row.sm_aa_LocationID))])]),n._v(" "),e("el-form-item",{attrs:{label:"广告类型编码 ID"}},[e("span",[n._v(n._s(a.row.sm_aa_AdviertiseTypeID))])]),n._v(" "),e("el-form-item",{attrs:{label:"供应商编码 ID"}},[e("span",[n._v(n._s(a.row.sm_aa_AgentID))])]),n._v(" "),e("el-form-item",{attrs:{label:"广告图片"}},n._l(a.row.sm_aa_Images,function(n){return e("img",{attrs:{src:n,width:"80",height:"50",alt:""}})})),n._v(" "),e("el-form-item",{attrs:{label:"广告描述"}},[e("span",[n._v(n._s(a.row.sm_aa_Describe))])]),n._v(" "),e("el-form-item",{attrs:{label:"产品ID"}},[e("span",[n._v(n._s(a.row.sm_aa_ProductID))])]),n._v(" "),e("el-form-item",{attrs:{label:"创建时间"}},[e("span",[n._v(n._s(n._f("getNewDate")(a.row.sm_aa_CreateTime)))])]),n._v(" "),e("el-form-item",{attrs:{label:"审核时间"}},[e("span",[n._v(n._s(n._f("getNewDate")(a.row.sm_aa_PassTime)))])]),n._v(" "),e("el-form-item",{attrs:{label:"审核状态"}},[e("span",[n._v(n._s(n._f("getAdApplyPass")(a.row.sm_aa_PassState)))])]),n._v(" "),e("el-form-item",{attrs:{label:"审核失败原因"}},[e("span",[n._v(n._s(a.row.sm_aa_FailedReason))])]),n._v(" "),e("el-form-item",{attrs:{label:"备注"}},[e("span",[n._v(n._s(a.row.sm_aa_Remark))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"申请广告编码",prop:"sm_aa_ID"}}),n._v(" "),e("el-table-column",{attrs:{label:"审核时间",prop:"sm_aa_PassTime"},scopedSlots:n._u([{key:"default",fn:function(a){return[e("span",[n._v(n._s(n._f("getNewDate")(a.row.sm_aa_PassTime)))])]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"审核状态",prop:"sm_aa_PassState"},scopedSlots:n._u([{key:"default",fn:function(a){return[e("span",[n._v(n._s(n._f("getAdApplyPass")(a.row.sm_aa_PassState)))])]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"备注",prop:"sm_aa_Remark"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.Update(a.row.sm_aa_ID)}}},[n._v("修改\n            ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.Delete(a.row.sm_aa_ID)}}},[n._v("删除\n            ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加广告申请",visible:n.addDialog},on:{"update:visible":function(a){n.addDialog=a}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"广告类型名称:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择广告类型名称"},model:{value:n.addOptions.data.sm_aa_AdviertiseTypeID,callback:function(a){n.$set(n.addOptions.data,"sm_aa_AdviertiseTypeID",a)},expression:"addOptions.data.sm_aa_AdviertiseTypeID"}},n._l(n.adTypeApplyAllList,function(n){return e("el-option",{key:n.sm_at_ID,attrs:{label:n.sm_at_Name,value:n.sm_at_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"位置信息:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择位置信息"},model:{value:n.addOptions.data.sm_aa_LocationID,callback:function(a){n.$set(n.addOptions.data,"sm_aa_LocationID",a)},expression:"addOptions.data.sm_aa_LocationID"}},n._l(n.adPositionAllList,function(n){return e("el-option",{key:n.sm_pi_ID,attrs:{label:n.sm_pi_Name,value:n.sm_pi_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"广告图片:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("推荐类型图片上传\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),n._v(" "),n._l(n.ImageURL,function(a){return e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a,expression:"item"},{name:"show",rawName:"v-show",value:n.ImageURL.length,expression:"ImageURL.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:"",alt:""}})})],2),n._v(" "),e("el-form-item",{attrs:{label:"广告描述:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"广告描述"},model:{value:n.addOptions.data.sm_aa_Describe,callback:function(a){n.$set(n.addOptions.data,"sm_aa_Describe",a)},expression:"addOptions.data.sm_aa_Describe"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"产品ID:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"产品ID"},model:{value:n.addOptions.data.sm_aa_ProductID,callback:function(a){n.$set(n.addOptions.data,"sm_aa_ProductID",a)},expression:"addOptions.data.sm_aa_ProductID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"审核员编码:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"审核员编码"},model:{value:n.addOptions.data.sm_aa_OperateCode,callback:function(a){n.$set(n.addOptions.data,"sm_aa_OperateCode",a)},expression:"addOptions.data.sm_aa_OperateCode"}})],1),n._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:n.isShow,expression:"isShow"}],attrs:{label:"审核失败原因:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"审核失败原因"},model:{value:n.addOptions.data.sm_aa_FailedReason,callback:function(a){n.$set(n.addOptions.data,"sm_aa_FailedReason",a)},expression:"addOptions.data.sm_aa_FailedReason"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入备注",type:"textarea"},model:{value:n.addOptions.data.sm_aa_Remark,callback:function(a){n.$set(n.addOptions.data,"sm_aa_Remark",a)},expression:"addOptions.data.sm_aa_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改广告申请",visible:n.updateDialog},on:{"update:visible":function(a){n.updateDialog=a}}},[e("el-form",{attrs:{model:n.updateAdApplyObj}},[e("el-form-item",{attrs:{label:"申请广告编码:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入申请广告编码",disabled:n.isOff},model:{value:n.updateAdApplyObj.sm_aa_ID,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_ID",a)},expression:"updateAdApplyObj.sm_aa_ID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"广告类型名称:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择广告类型名称"},model:{value:n.updateAdApplyObj.sm_aa_AdviertiseTypeID,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_AdviertiseTypeID",a)},expression:"updateAdApplyObj.sm_aa_AdviertiseTypeID"}},n._l(n.adTypeApplyAllList,function(n){return e("el-option",{key:n.sm_at_ID,attrs:{label:n.sm_at_Name,value:n.sm_aa_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"位置信息:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择位置信息"},model:{value:n.updateAdApplyObj.sm_aa_LocationID,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_LocationID",a)},expression:"updateAdApplyObj.sm_aa_LocationID"}},n._l(n.adPositionAllList,function(n){return e("el-option",{key:n.sm_aa_LocationID,attrs:{label:n.sm_pi_Name,value:n.sm_aa_LocationID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"广告图片:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:void(0);"}},[n._v("推荐类型图片上传\n            "),e("input",{ref:"upload1",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),n._v(" "),n._l(n.ImageURL1,function(a){return e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a,expression:"item"},{name:"show",rawName:"v-show",value:n.ImageURL1.length,expression:"ImageURL1.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:"",alt:""}})})],2),n._v(" "),e("el-form-item",{attrs:{label:"广告描述:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入广告描述"},model:{value:n.updateAdApplyObj.sm_aa_Describe,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_Describe",a)},expression:"updateAdApplyObj.sm_aa_Describe"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"产品ID:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入产品ID"},model:{value:n.updateAdApplyObj.sm_aa_ProductID,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_ProductID",a)},expression:"updateAdApplyObj.sm_aa_ProductID"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"审核状态:","label-width":n.formLabelWidth}},[e("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-value":"1","inactive-value":"2","active-text":"通过","inactive-text":"不通过"},on:{change:n.OnChangeUpdate},model:{value:n.updateAdApplyObj.sm_aa_PassState,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_PassState",a)},expression:"updateAdApplyObj.sm_aa_PassState"}})],1),n._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:n.isShow1,expression:"isShow1"}],attrs:{label:"审核失败原因:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入审核失败原因"},model:{value:n.updateAdApplyObj.sm_aa_FailedReason,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_FailedReason",a)},expression:"updateAdApplyObj.sm_aa_FailedReason"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入备注",type:"textarea"},model:{value:n.updateAdApplyObj.sm_aa_Remark,callback:function(a){n.$set(n.updateAdApplyObj,"sm_aa_Remark",a)},expression:"updateAdApplyObj.sm_aa_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateAdApplySubmit}},[n._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var r=e("VU/8")(l,o,!1,function(n){e("5kLq")},"data-v-1122304f",null);a.default=r.exports},uGRC:function(n,a,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});