webpackJsonp([38],{Ides:function(t,e,o){var i=o("Xdnl");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);o("rjj0")("37cda8c4",i,!0)},ShKq:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("NYxO"),a=(o("jvWE"),{name:"",components:{Upload:o("TAej").a},computed:Object(i.b)(["foodStoreInformtionList","foodStoreProductList","foodStoreProductPictureList"]),data:function(){return{isLoading:!1,storeId:"",productId:"",formLabelWidth:"120px",imageObj:{accept:"image/*"},addOptions:{fd_gi_GoodID:"",fd_gi_GoodImage:""},addDialog:!1,updateObj:{},updateDialog:!1,bigPictureDialog:!1,imgUrl:"",ImageURL:[],ImageURL1:[],radioIndex:0,updateRadioIndex:0,isNewUploaNode:!0,userInfo:{},total:0}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.foodStoreInformtionList.length||this.initFoodStoreInformtion(),this.initData()},methods:{getData:function(t){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.ImageURL.push(t.data)},getUpdateData:function(t){this.updateRadioIndex?(this.ImageURL1.splice(this.updateRadioIndex-1,1,t.data),this.updateRadioIndex=""):this.ImageURL1.push(t.data)},deleteImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},deleteUpdateImageURL:function(t){console.log(1),this.isNewUploaNode=!1,this.ImageURL1=this.ImageURL1.filter(function(e){return e!=t})},handleCurrentChange:function(t){this.initData(this.storeId,t)},initFoodStoreInformtion:function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sf_TradeID:this.userInfo.sm_ui_ID};this.$store.dispatch("initFoodStoreInformtion",t)},changeProduct:function(t){this.initProductData(t)},initProductData:function(t){var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sfp_ID:"",fd_sfp_StoreFrontID:t||"",fd_sfp_Name:"",priceFrom:"",priceTo:""};this.$store.dispatch("initFoodStoreProduct",e).then(function(){},function(t){$notify({message:t,type:"error"})})},initData:function(t){var e=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",page:"1",rows:"5",agentID:this.userInfo.sm_ui_ID,fd_gi_ID:"",fd_gi_GoodID:t||""};this.isLoading=!0,this.$store.dispatch("initFoodStoreProductPicture",o).then(function(t){e.total=t,e.isLoading=!1},function(t){e.$notify({message:t,type:"error"})})},search:function(){this.initData(this.productId)},displayBigPicture:function(t){this.$store.commit("setTranstionFalse"),this.bigPictureDialog=!0,this.imgUrl=t},add:function(){var t=document.querySelector(".uploader-list");for(var e in t&&(t.querySelector("ul").innerHTML=""),this.addOptions)this.addOptions[e]="";this.ImageURL=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addOptions.fd_gi_GoodImage=this.ImageURL.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addFoodStoreProductPicture",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.productId)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},update:function(t){this.updateDialog=!0,this.updateObj=t,this.ImageURL1=t.fd_gi_GoodImage.split(","),this.$store.commit("setTranstionFalse"),this.updateDialog=!0},updateSubmit:function(){var t=this;this.updateObj.fd_gi_GoodImage=this.ImageURL1.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateObj};this.$store.dispatch("updateFoodStoreProductPicture",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.productId)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_gi_ID:t||""}};this.$store.dispatch("deleteFoodStoreProductPicture",o).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.productId)},function(t){e.$notify({message:t,type:"error"})})}}}),s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[o("h1",{staticClass:"userClass"},[t._v("店面菜肴图片")]),t._v(" "),o("el-col",{staticClass:"formSearch",attrs:{span:24}},[o("el-form",{attrs:{inline:!0}},[o("el-form-item",[o("span",[t._v("店面名称筛选:")])]),t._v(" "),o("el-form-item",[o("el-select",{attrs:{placeholder:"请选择店面",size:"small"},on:{change:t.changeProduct},model:{value:t.storeId,callback:function(e){t.storeId=e},expression:"storeId"}},t._l(t.foodStoreInformtionList,function(t){return o("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),o("el-form-item",[o("el-select",{attrs:{placeholder:"请选择菜肴名称",size:"small"},model:{value:t.productId,callback:function(e){t.productId=e},expression:"productId"}},t._l(t.foodStoreProductList,function(t){return o("el-option",{key:t.fd_sfp_ID,attrs:{label:t.fd_sfp_Name,value:t.fd_sfp_ID}})}))],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),o("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.foodStoreProductPictureList.length,expression:"!foodStoreProductPictureList.length"}],attrs:{type:"primary",size:"small"},on:{click:t.add}},[t._v("添加\n          ")])],1)],1)],1),t._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.foodStoreProductPictureList}},[o("el-table-column",{attrs:{prop:"fd_sfp_Name",label:"菜肴名称",align:"center"}}),t._v(" "),o("el-table-column",{attrs:{label:"菜肴图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("img",{attrs:{src:e.row.fd_gi_GoodImage,width:"128",height:"80"},on:{click:function(o){t.displayBigPicture(e.row.fd_gi_GoodImage)}}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(o){t.update(e.row)}}},[t._v("修改\n          ")]),t._v(" "),o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){t.Delete(e.row.fd_gi_ID)}}},[t._v("删除\n          ")])]}}])})],1),t._v(" "),o("el-dialog",{attrs:{title:"显示大图",visible:t.bigPictureDialog,width:"50%"},on:{"update:visible":function(e){t.bigPictureDialog=e}}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgUrl,expression:"imgUrl"}],attrs:{width:"100%"}}),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.bigPictureDialog=!1}}},[t._v("取 消")])],1)]),t._v(" "),o("el-dialog",{attrs:{title:"添加店面菜肴图片",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e}}},[o("el-form",{attrs:{model:t.addOptions}},[o("el-form-item",{attrs:{label:"选择店面:","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择产品"},on:{change:t.changeProduct},model:{value:t.storeId,callback:function(e){t.storeId=e},expression:"storeId"}},t._l(t.foodStoreInformtionList,function(t){return o("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"店面产品:","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择产品"},model:{value:t.addOptions.fd_gi_GoodID,callback:function(e){t.$set(t.addOptions,"fd_gi_GoodID",e)},expression:"addOptions.fd_gi_GoodID"}},t._l(t.foodStoreProductList,function(t){return o("el-option",{key:t.fd_sfp_ID,attrs:{label:t.fd_sfp_Name,value:t.fd_sfp_ID}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"产品图片:","label-width":t.formLabelWidth}},[o("p",[t._v("单张图片不能大于600KB")]),t._v(" "),o("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),o("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,i){return o("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[o("span",{staticStyle:{color:"#f60"},on:{click:function(o){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),o("em",[o("el-radio",{attrs:{label:i+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"修改店面菜肴图片",visible:t.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.updateDialog=e}}},[o("el-form",{attrs:{model:t.updateObj}},[o("el-form-item",{attrs:{label:"店面产品:","label-width":t.formLabelWidth}},[o("el-select",{attrs:{placeholder:"请选择房间"},model:{value:t.updateObj.fd_gi_GoodID,callback:function(e){t.$set(t.updateObj,"fd_gi_GoodID",e)},expression:"updateObj.fd_gi_GoodID"}},t._l(t.foodStoreProductList,function(t){return o("el-option",{key:t.fd_sfp_ID,attrs:{label:t.fd_sfp_Name,value:t.fd_sfp_ID}})}))],1),t._v(" "),o("el-form-item",{attrs:{label:"产品图片:","label-width":t.formLabelWidth}},[o("p",[t._v("单张图片不能大于600KB")]),t._v(" "),o("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getUpdateData}}),t._v(" "),o("div",{staticClass:"imgWap"},t._l(t.ImageURL1,function(e,i){return o("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[o("span",{staticStyle:{color:"#f60"},on:{click:function(o){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),o("em",[o("el-radio",{attrs:{label:i+1},model:{value:t.updateRadioIndex,callback:function(e){t.updateRadioIndex=e},expression:"updateRadioIndex"}},[t._v("替换")])],1),t._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1),t._v(" "),o("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[o("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)])},staticRenderFns:[]};var n=o("VU/8")(a,s,!1,function(t){o("Ides")},"data-v-3b3eab24",null);e.default=n.exports},Xdnl:function(t,e,o){(t.exports=o("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-3b3eab24] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-3b3eab24] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])}});