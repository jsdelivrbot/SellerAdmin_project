webpackJsonp([3],{BcIn:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},ShKq:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("//Fk"),i=e.n(o),a=e("NYxO"),s=e("jvWE"),r={computed:Object(a.b)(["foodStoreInformtionList","foodStoreProductList","foodStoreProductPictureList"]),data:function(){return{isLoading:!1,storeId:"",productId:"",formLabelWidth:"120px",addOptions:{fd_gi_GoodID:"",fd_gi_GoodImage:""},addDialog:!1,updateObj:{},updateDialog:!1,bigPictureDialog:!1,imgUrl:""}},methods:{uploadImg:function(n){return new i.a(function(t,e){lrz(n).then(function(n){t(n.base64.split(",")[1])})})},uploadToOSS:function(n){return new i.a(function(t,e){var o=new FormData;o.append("fileToUpload",n);var i=new XMLHttpRequest;i.open("POST",s.a+"/OSSFile/PostToOSS"),i.send(o),i.onreadystatechange=function(){if(4==i.readyState&&200==i.status){if(i.responseText){var n=i.responseText;t(JSON.parse(n))}}else console.log(i.responseText)}})},uploaNode:function(){var n=this;this.addOptions.fd_gi_GoodImage="",setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(t){for(var e=0;e<n.$refs.upload.files.length;e++)n.uploadToOSS(n.$refs.upload.files[e]).then(function(t){t?n.addOptions.fd_gi_GoodImage=t.data:n.$notify({message:"图片地址不存在!",type:"error"})})})},30)},changeProduct:function(n){this.initProductData(n)},initProductData:function(n){if(n){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sfp_ID:"",fd_sfp_StoreFrontID:n,fd_sfp_Name:"",priceFrom:"",priceTo:"",page:1,rows:"10000"};this.$store.dispatch("initFoodStoreProduct",t).then(function(){},function(n){$notify({message:n,type:"error"})})}else this.$notify({message:"请选择店面！",type:"error"})},initData:function(n){var t=this;if(n){var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_gi_ID:"",fd_gi_GoodID:n};this.isLoading=!0,this.$store.dispatch("initFoodStoreProductPicture",e).then(function(){t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})}else this.$notify({message:"请选择菜肴！",type:"error"})},search:function(){this.initData(this.productId)},displayBigPicture:function(n){this.$store.commit("setTranstionFalse"),this.bigPictureDialog=!0,this.imgUrl=n},add:function(){this.uploaNode(),this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addFoodStoreProductPicture",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.productId)},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},update:function(n){this.updateObj=n,this.uploaNode(),this.$store.commit("setTranstionFalse"),this.updateDialog=!0},updateSubmit:function(){var n=this;this.addOptions.fd_gi_GoodImage&&(this.updateObj.fd_gi_GoodImage=this.addOptions.fd_gi_GoodImage);var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateObj};this.$store.dispatch("updateFoodStoreProductPicture",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.productId)},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_gi_ID:n||""}};this.$store.dispatch("deleteFoodStoreProductPicture",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData(t.productId)},function(n){t.$notify({message:n,type:"error"})})}}},d={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("店面菜肴图片")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("店面名称筛选:")])]),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择店面",size:"small"},on:{change:n.changeProduct},model:{value:n.storeId,callback:function(t){n.storeId=t},expression:"storeId"}},n._l(n.foodStoreInformtionList,function(n){return e("el-option",{key:n.fd_sf_ID,attrs:{label:n.fd_sf_ProductName,value:n.fd_sf_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择菜肴名称",size:"small"},model:{value:n.productId,callback:function(t){n.productId=t},expression:"productId"}},n._l(n.foodStoreProductList,function(n){return e("el-option",{key:n.fd_sfp_ID,attrs:{label:n.fd_sfp_Name,value:n.fd_sfp_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{directives:[{name:"show",rawName:"v-show",value:!n.foodStoreProductPictureList.length,expression:"!foodStoreProductPictureList.length"}],attrs:{type:"primary",size:"small"},on:{click:n.add}},[n._v("添加")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.foodStoreProductPictureList}},[e("el-table-column",{attrs:{prop:"fd_sfp_Name",label:"菜肴名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"菜肴图片",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.row.fd_gi_GoodImage,expression:"scope.row.fd_gi_GoodImage"}],attrs:{width:"128",height:"80"},on:{click:function(e){n.displayBigPicture(t.row.fd_gi_GoodImage)}}})]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.update(t.row)}}},[n._v("修改\n          ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.Delete(t.row.fd_gi_ID)}}},[n._v("删除\n          ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"显示大图",visible:n.bigPictureDialog,width:"50%"},on:{"update:visible":function(t){n.bigPictureDialog=t}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.imgUrl,expression:"imgUrl"}],attrs:{width:"100%"}}),n._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.bigPictureDialog=!1}}},[n._v("取 消")])],1)]),n._v(" "),e("el-dialog",{attrs:{title:"添加店面菜肴图片",visible:n.addDialog},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"店面产品:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择产品"},model:{value:n.addOptions.fd_gi_GoodID,callback:function(t){n.$set(n.addOptions,"fd_gi_GoodID",t)},expression:"addOptions.fd_gi_GoodID"}},n._l(n.foodStoreProductList,function(n){return e("el-option",{key:n.fd_sfp_ID,attrs:{label:n.fd_sfp_Name,value:n.fd_sfp_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"产品图片:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("上传图片\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.fd_gi_GoodImage,expression:"addOptions.fd_gi_GoodImage"},{name:"show",rawName:"v-show",value:n.addOptions.fd_gi_GoodImage,expression:"addOptions.fd_gi_GoodImage"}],attrs:{width:"128",height:"80"}})])],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改店面菜肴图片",visible:n.updateDialog},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateObj}},[e("el-form-item",{attrs:{label:"店面产品:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择房间"},model:{value:n.updateObj.fd_gi_GoodID,callback:function(t){n.$set(n.updateObj,"fd_gi_GoodID",t)},expression:"updateObj.fd_gi_GoodID"}},n._l(n.foodStoreProductList,function(n){return e("el-option",{key:n.fd_sfp_ID,attrs:{label:n.fd_sfp_Name,value:n.fd_sfp_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"产品图片:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("上传图片\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.fd_gi_GoodImage,expression:"addOptions.fd_gi_GoodImage"},{name:"show",rawName:"v-show",value:n.addOptions.fd_gi_GoodImage,expression:"addOptions.fd_gi_GoodImage"}],attrs:{width:"128",height:"80"}})])],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var l=e("VU/8")(r,d,!1,function(n){e("ZW6f")},"data-v-fd65142a",null);t.default=l.exports},ZW6f:function(n,t,e){var o=e("BcIn");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("4f2dcdd9",o,!0)}});