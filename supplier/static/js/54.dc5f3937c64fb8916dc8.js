webpackJsonp([54],{"+3vp":function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},V5zq:function(n,e,t){var o=t("+3vp");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("6296f5ce",o,!0)},a1Be:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("//Fk"),a=t.n(o),i=t("NYxO"),s=t("jvWE"),r={computed:Object(i.b)(["foodStoreInformtionList","foodStoreRoomList","foodRoomPictureList"]),data:function(){return{isLoading:!1,storeId:"",roomId:"",formLabelWidth:"120px",total:0,addOptions:{fd_ri_RoomID:"",fd_ri_Image:"",fd_ri_Remark:""},addDialog:!1,updateDialog:!1,updateObj:{},bigPictureDialog:!1,imgUrl:"",userInfo:{}}},created:function(){if(this.userInfo=JSON.parse(sessionStorage.getItem("admin")),!this.foodStoreInformtionList.length){var n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sf_TradeID:this.userInfo.sm_ui_ID};this.$store.dispatch("initFoodStoreInformtion",n)}},methods:{uploadImg:function(n){return new a.a(function(e,t){lrz(n).then(function(n){e(n.base64.split(",")[1])})})},uploadToOSS:function(n){return new a.a(function(e,t){var o=new FormData;o.append("fileToUpload",n);var a=new XMLHttpRequest;a.open("POST",s.a+"/OSSFile/PostToOSS"),a.send(o),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status&&a.responseText){var n=a.responseText;e(JSON.parse(n))}}})},uploaNode:function(){var n=this;this.addOptions.fd_ri_Image="",setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(e){for(var t=0;t<n.$refs.upload.files.length;t++)n.uploadToOSS(n.$refs.upload.files[t]).then(function(e){e?n.addOptions.fd_ri_Image=e.data:n.$notify({message:"图片地址不存在!",type:"error"})})})},30)},changeRoom:function(n){this.initRoomData(n)},initRoomData:function(n){var e=this;if(n){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",fd_sfr_ID:"",fd_sfr_StoreFrontID:n,fd_sfr_RoomName:"",page:"1",rows:"10000"};this.$store.dispatch("initFoodStoreRoom",t).then(function(n){e.total=n},function(n){e.$notify({message:n,type:"error"})})}else this.$notify({message:"请选择店面！",type:"error"})},initData:function(n){var e=this;if(n){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",page:"1",rows:"10",fd_ri_ID:"",fd_ri_RoomID:n};this.isLoading=!0,this.$store.dispatch("initFoodRoomPicture",t).then(function(n){e.isLoading=!1,e.total=n},function(n){})}else this.$notify({message:"请选择房间！",type:"error"})},search:function(){this.initData(this.roomId)},displayBigPicture:function(n){this.$store.commit("setTranstionFalse"),this.imgUrl=n,this.bigPictureDialog=!0},add:function(){this.$store.commit("setTranstionFalse"),this.addDialog=!0,this.uploaNode()},addSubmit:function(){var n=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addFoodRoomPicture",e).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.addOptions.fd_ri_RoomID)},function(e){n.$notify({message:e,type:"error"})}),this.addDialog=!1},update:function(n){this.updateObj=n,this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.uploaNode()},updateSubmit:function(){var n=this;this.addOptions.fd_ri_Image&&(this.updateObj.fd_ri_Image=this.addOptions.fd_ri_Image);var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateObj};this.$store.dispatch("updateFoodRoomPicture",e).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.updateObj.fd_ri_RoomID)},function(e){n.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_ri_ID:n||""}};this.$store.dispatch("deleteFoodRoomPicture",t).then(function(n){e.$notify({message:n,type:"success"}),e.initData(e.roomId)},function(n){e.$notify({message:n,type:"error"})})}}},l={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("店面房间图片")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",[t("span",[n._v("店面名称筛选:")])]),n._v(" "),t("el-form-item",[t("el-select",{attrs:{placeholder:"请选择店面",size:"small"},on:{change:n.changeRoom},model:{value:n.storeId,callback:function(e){n.storeId=e},expression:"storeId"}},n._l(n.foodStoreInformtionList,function(n){return t("el-option",{key:n.fd_sf_ID,attrs:{label:n.fd_sf_ProductName,value:n.fd_sf_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-select",{attrs:{placeholder:"请选择房间",size:"small"},model:{value:n.roomId,callback:function(e){n.roomId=e},expression:"roomId"}},n._l(n.foodStoreRoomList,function(n){return t("el-option",{key:n.fd_sfr_ID,attrs:{label:n.fd_sfr_RoomName,value:n.fd_sfr_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),t("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.add}},[n._v("添加")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.foodRoomPictureList}},[t("el-table-column",{attrs:{prop:"fd_sfr_RoomName",label:"房间名称",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"fd_ri_Remark",label:"备注",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{label:"房间图片",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.row.fd_ri_Image,expression:"scope.row.fd_ri_Image"}],attrs:{width:"128",height:"80"},on:{click:function(t){n.displayBigPicture(e.row.fd_ri_Image)}}})]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){n.update(e.row)}}},[n._v("修改\n          ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){n.Delete(e.row.fd_ri_ID)}}},[n._v("删除\n          ")])]}}])})],1),n._v(" "),t("el-dialog",{attrs:{title:"显示大图",visible:n.bigPictureDialog,width:"50%"},on:{"update:visible":function(e){n.bigPictureDialog=e}}},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.imgUrl,expression:"imgUrl"}],attrs:{width:"100%"}}),n._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.bigPictureDialog=!1}}},[n._v("取 消")])],1)]),n._v(" "),t("el-dialog",{attrs:{title:"添加店面房间图片",visible:n.addDialog},on:{"update:visible":function(e){n.addDialog=e}}},[t("el-form",{attrs:{model:n.addOptions}},[t("el-form-item",{attrs:{label:"店面房间:","label-width":n.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择房间"},model:{value:n.addOptions.fd_ri_RoomID,callback:function(e){n.$set(n.addOptions,"fd_ri_RoomID",e)},expression:"addOptions.fd_ri_RoomID"}},n._l(n.foodStoreRoomList,function(n){return t("el-option",{key:n.fd_sfr_ID,attrs:{label:n.fd_sfr_RoomName,value:n.fd_sfr_ID}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"房间图片:","label-width":n.formLabelWidth}},[t("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("上传图片\n            "),t("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"},{name:"show",rawName:"v-show",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"}],attrs:{width:"128",height:"80"}})]),n._v(" "),t("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[t("el-input",{model:{value:n.addOptions.fd_ri_Remark,callback:function(e){n.$set(n.addOptions,"fd_ri_Remark",e)},expression:"addOptions.fd_ri_Remark"}})],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),t("el-dialog",{attrs:{title:"修改店面房间图片",visible:n.updateDialog},on:{"update:visible":function(e){n.updateDialog=e}}},[t("el-form",{attrs:{model:n.updateObj}},[t("el-form-item",{attrs:{label:"店面房间:","label-width":n.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择房间"},model:{value:n.updateObj.fd_ri_RoomID,callback:function(e){n.$set(n.updateObj,"fd_ri_RoomID",e)},expression:"updateObj.fd_ri_RoomID"}},n._l(n.foodStoreRoomList,function(n){return t("el-option",{key:n.fd_sfr_ID,attrs:{label:n.fd_sfr_RoomName,value:n.fd_sfr_ID}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"房间图片:","label-width":n.formLabelWidth}},[t("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("上传图片\n            "),t("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),t("p",[n._v("如果不上传图片默认为原来的图片")]),n._v(" "),t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"},{name:"show",rawName:"v-show",value:n.addOptions.fd_ri_Image,expression:"addOptions.fd_ri_Image"}],attrs:{width:"128",height:"80"}})]),n._v(" "),t("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[t("el-input",{model:{value:n.updateObj.fd_ri_Remark,callback:function(e){n.$set(n.updateObj,"fd_ri_Remark",e)},expression:"updateObj.fd_ri_Remark"}})],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var d=t("VU/8")(r,l,!1,function(n){t("V5zq")},"data-v-03c7ebf9",null);e.default=d.exports}});