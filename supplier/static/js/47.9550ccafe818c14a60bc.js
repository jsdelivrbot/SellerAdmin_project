webpackJsonp([47],{DoXF:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},a1Be:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("//Fk"),a=e.n(o),i=e("NYxO"),s=e("jvWE"),r={computed:Object(i.b)(["foodStoreInformtionList","foodStoreRoomList","foodRoomPictureList"]),data:function(){return{isLoading:!1,storeId:"",roomId:"",formLabelWidth:"120px",total:0,addOptions:{fd_ri_RoomID:"",fd_ri_Image:"",fd_ri_Remark:""},addDialog:!1,updateDialog:!1,updateObj:{},bigPictureDialog:!1,imgUrl:"",userInfo:{}}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.foodStoreInformtionList.length||this.initFoodStoreInformtion(),this.initData()},methods:{handleCurrentChange:function(n){this.initData(this.storeId,n)},initFoodStoreInformtion:function(){var n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sf_TradeID:this.userInfo.sm_ui_ID};this.$store.dispatch("initFoodStoreInformtion",n)},uploadImg:function(n){return new a.a(function(t,e){lrz(n).then(function(n){t(n.base64.split(",")[1])})})},uploadToOSS:function(n){return new a.a(function(t,e){var o=new FormData;o.append("fileToUpload",n);var a=new XMLHttpRequest;a.open("POST",s.a+"/OSSFile/PostToOSS"),a.send(o),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status&&a.responseText){var n=a.responseText;t(JSON.parse(n))}}})},uploaNode:function(){var n=this;this.addOptions.fd_ri_Image="",setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(t){for(var e=0;e<n.$refs.upload.files.length;e++)n.uploadToOSS(n.$refs.upload.files[e]).then(function(t){t?n.addOptions.fd_ri_Image=t.data:n.$notify({message:"图片地址不存在!",type:"error"})})})},30)},changeRoom:function(n){this.initRoomData(n)},initRoomData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",fd_sfr_ID:"",fd_sfr_StoreFrontID:n||"",fd_sfr_RoomName:""};this.$store.dispatch("initFoodStoreRoom",e).then(function(n){t.total=n},function(n){t.$notify({message:n,type:"error"})})},initData:function(n,t){var e=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",page:t||1,rows:"5",fd_ri_ID:"",fd_ri_RoomID:n||"",agentID:this.userInfo.sm_ui_ID};this.isLoading=!0,this.$store.dispatch("initFoodRoomPicture",o).then(function(n){e.isLoading=!1,e.total=n},function(n){})},search:function(){this.initData(this.roomId)},displayBigPicture:function(n){this.$store.commit("setTranstionFalse"),this.imgUrl=n,this.bigPictureDialog=!0},add:function(){this.$store.commit("setTranstionFalse"),this.addDialog=!0,this.uploaNode()},addSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addFoodRoomPicture",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.addOptions.fd_ri_RoomID)},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},update:function(n){this.updateObj=n,this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.uploaNode()},updateSubmit:function(){var n=this;this.addOptions.fd_ri_Image&&(this.updateObj.fd_ri_Image=this.addOptions.fd_ri_Image);var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateObj};this.$store.dispatch("updateFoodRoomPicture",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.updateObj.fd_ri_RoomID)},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_ri_ID:n||""}};this.$store.dispatch("deleteFoodRoomPicture",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData(t.roomId)},function(n){t.$notify({message:n,type:"error"})})}}},l={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("店面房间图片")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("店面名称筛选:")])]),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择店面",size:"small"},on:{change:n.changeRoom},model:{value:n.storeId,callback:function(t){n.storeId=t},expression:"storeId"}},n._l(n.foodStoreInformtionList,function(n){return e("el-option",{key:n.fd_sf_ID,attrs:{label:n.fd_sf_ProductName,value:n.fd_sf_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择房间",size:"small"},model:{value:n.roomId,callback:function(t){n.roomId=t},expression:"roomId"}},n._l(n.foodStoreRoomList,function(n){return e("el-option",{key:n.fd_sfr_ID,attrs:{label:n.fd_sfr_RoomName,value:n.fd_sfr_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.add}},[n._v("添加")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.foodRoomPictureList}},[e("el-table-column",{attrs:{prop:"fd_sfr_RoomName",label:"房间名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"fd_ri_Remark",label:"备注",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"房间图片",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.row.fd_ri_Image,expression:"scope.row.fd_ri_Image"}],attrs:{width:"128",height:"80"},on:{click:function(e){n.displayBigPicture(t.row.fd_ri_Image)}}})]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.update(t.row)}}},[n._v("修改\n          ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.Delete(t.row.fd_ri_ID)}}},[n._v("删除\n          ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"显示大图",visible:n.bigPictureDialog,width:"50%"},on:{"update:visible":function(t){n.bigPictureDialog=t}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.imgUrl,expression:"imgUrl"}],attrs:{width:"100%"}}),n._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.bigPictureDialog=!1}}},[n._v("取 消")])],1)]),n._v(" "),e("el-dialog",{attrs:{title:"添加店面房间图片",visible:n.addDialog},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"请选择店面:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择店面"},on:{change:n.changeRoom},model:{value:n.storeId,callback:function(t){n.storeId=t},expression:"storeId"}},n._l(n.foodStoreInformtionList,function(n){return e("el-option",{key:n.fd_sf_ID,attrs:{label:n.fd_sf_ProductName,value:n.fd_sf_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"店面房间:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择房间"},model:{value:n.addOptions.fd_ri_RoomID,callback:function(t){n.$set(n.addOptions,"fd_ri_RoomID",t)},expression:"addOptions.fd_ri_RoomID"}},n._l(n.foodStoreRoomList,function(n){return e("el-option",{key:n.fd_sfr_ID,attrs:{label:n.fd_sfr_RoomName,value:n.fd_sfr_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"房间图片:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("上传图片\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"},{name:"show",rawName:"v-show",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"}],attrs:{width:"128",height:"80"}})]),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.fd_ri_Remark,callback:function(t){n.$set(n.addOptions,"fd_ri_Remark",t)},expression:"addOptions.fd_ri_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改店面房间图片",visible:n.updateDialog},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateObj}},[e("el-form-item",{attrs:{label:"店面房间:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择房间"},model:{value:n.updateObj.fd_ri_RoomID,callback:function(t){n.$set(n.updateObj,"fd_ri_RoomID",t)},expression:"updateObj.fd_ri_RoomID"}},n._l(n.foodStoreRoomList,function(n){return e("el-option",{key:n.fd_sfr_ID,attrs:{label:n.fd_sfr_RoomName,value:n.fd_sfr_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"房间图片:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("上传图片\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),e("p",[n._v("如果不上传图片默认为原来的图片")]),n._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"},{name:"show",rawName:"v-show",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"}],attrs:{width:"128",height:"80"}})]),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateObj.fd_ri_Remark,callback:function(t){n.$set(n.updateObj,"fd_ri_Remark",t)},expression:"updateObj.fd_ri_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)])},staticRenderFns:[]};var d=e("VU/8")(r,l,!1,function(n){e("levg")},"data-v-23d48222",null);t.default=d.exports},levg:function(n,t,e){var o=e("DoXF");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("b2751cac",o,!0)}});