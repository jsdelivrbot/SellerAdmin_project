webpackJsonp([57],{SOk8:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-010c1e9e] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-010c1e9e] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},XpRR:function(t,e,i){var a=i("SOk8");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("0ef1fbda",a,!0)},Xsdo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("NYxO"),o=(i("jvWE"),i("TAej")),s={computed:Object(a.b)(["foodStoreInformtionList","foodProductPictureList"]),name:"",components:{Upload:o.a},data:function(){return{isLoading:!1,storeId:"",addDialog:!1,formLabelWidth:"120px",imageObj:{accept:"image/*"},addOptions:{fd_pi_StoreFront:"",fd_pi_ImageUrl:""},imgUrl:"",ImageURL:[],ImageURL1:[],radioIndex:0,updateRadioIndex:0,isNewUploaNode:!0,bigPictureDialog:!1,updateDialog:!1,updateObj:{},isShow:!1,total:0}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.foodStoreInformtionList.length||this.initFoodStoreInformtion(),this.initData()},methods:{getData:function(t){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.ImageURL.push(t.data)},getUpdateData:function(t){this.updateRadioIndex?(this.ImageURL1.splice(this.updateRadioIndex-1,1,t.data),this.updateRadioIndex=""):this.ImageURL1.push(t.data)},deleteImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},deleteUpdateImageURL:function(t){console.log(1),this.isNewUploaNode=!1,this.ImageURL1=this.ImageURL1.filter(function(e){return e!=t})},handleCurrentChange:function(t){this.initData(this.storeId,t)},initFoodStoreInformtion:function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sf_TradeID:this.userInfo.sm_ui_ID};this.$store.dispatch("initFoodStoreInformtion",t)},initData:function(t,e){var i=this;this.isLoading=!0;var a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_pi_ID:"",fd_pi_StoreFront:t||"",agentID:this.userInfo.sm_ui_ID,page:e||1,rows:5};this.$store.dispatch("initFoodProductPicture",a).then(function(t){i.total=t,i.isLoading=!1},function(t){i.$notify({message:t,type:"error"})})},search:function(){this.initData(this.storeId)},displayBigPicture:function(t){this.$store.commit("setTranstionFalse"),this.bigPictureDialog=!0,this.imgUrl=t},add:function(){for(var t in this.addOptions)this.addOptions[t]="";this.ImageURL=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addOptions.fd_pi_ImageUrl=this.ImageURL.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addFoodProductPicture",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.storeId)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},update:function(t){this.updateDialog=!0,this.ImageURL1=t.fd_pi_ImageUrl.split(","),this.$store.commit("setTranstionFalse"),this.updateObj=t},updateSubmit:function(){var t=this;this.updateObj.fd_pi_ImageUrl=this.ImageURL1.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateObj};this.$store.dispatch("updateFoodProductPicture",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.storeId)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_pi_ID:t||""}};this.$store.dispatch("deleteFoodProductPicture",i).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.storeId)},function(t){e.$notify({message:t,type:"error"})})}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[i("h1",{staticClass:"userClass"},[t._v("店面图片")]),t._v(" "),i("el-col",{staticClass:"formSearch",attrs:{span:24}},[i("el-form",{attrs:{inline:!0}},[i("el-form-item",[i("span",[t._v("店面名称筛选:")])]),t._v(" "),i("el-form-item",[i("el-select",{attrs:{placeholder:"请选择店面",size:"small"},model:{value:t.storeId,callback:function(e){t.storeId=e},expression:"storeId"}},t._l(t.foodStoreInformtionList,function(t){return i("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.add}},[t._v("添加")])],1)],1)],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.foodProductPictureList}},[i("el-table-column",{attrs:{prop:"fd_pi_ID",label:"图片编号",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"fd_sf_ProductName",label:"店面名称",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"店面图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("img",{attrs:{src:e.row.fd_pi_ImageUrl,width:"128",height:"80"},on:{click:function(i){t.displayBigPicture(e.row.fd_pi_ImageUrl)}}})]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){t.update(e.row)}}},[t._v("修改\n          ")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){t.Delete(e.row.fd_pi_ID)}}},[t._v("删除\n          ")])]}}])})],1),t._v(" "),i("el-dialog",{attrs:{title:"显示大图",visible:t.bigPictureDialog,width:"50%"},on:{"update:visible":function(e){t.bigPictureDialog=e}}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgUrl,expression:"imgUrl"}],attrs:{width:"100%"}}),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.bigPictureDialog=!1}}},[t._v("取 消")])],1)]),t._v(" "),i("el-dialog",{attrs:{title:"添加店面图片",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e}}},[i("el-form",{attrs:{model:t.addOptions}},[i("el-form-item",{attrs:{label:"店面名称:","label-width":t.formLabelWidth}},[i("el-select",{attrs:{placeholder:"请选择店面"},model:{value:t.addOptions.fd_pi_StoreFront,callback:function(e){t.$set(t.addOptions,"fd_pi_StoreFront",e)},expression:"addOptions.fd_pi_StoreFront"}},t._l(t.foodStoreInformtionList,function(t){return i("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"菜肴图片:","label-width":t.formLabelWidth}},[i("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),i("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,a){return i("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[i("span",{staticStyle:{color:"#f60"},on:{click:function(i){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),i("em",[i("el-radio",{attrs:{label:a+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"修改店面图片",visible:t.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.updateDialog=e}}},[i("el-form",{attrs:{model:t.updateObj}},[i("el-form-item",{attrs:{label:"店面名称:","label-width":t.formLabelWidth}},[i("el-select",{attrs:{placeholder:"请选择店面"},model:{value:t.updateObj.fd_pi_StoreFront,callback:function(e){t.$set(t.updateObj,"fd_pi_StoreFront",e)},expression:"updateObj.fd_pi_StoreFront"}},t._l(t.foodStoreInformtionList,function(t){return i("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"菜肴图片:","label-width":t.formLabelWidth}},[i("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getUpdateData}}),t._v(" "),i("div",{staticClass:"imgWap"},t._l(t.ImageURL1,function(e,a){return i("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[i("span",{staticStyle:{color:"#f60"},on:{click:function(i){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),i("em",[i("el-radio",{attrs:{label:a+1},model:{value:t.updateRadioIndex,callback:function(e){t.updateRadioIndex=e},expression:"updateRadioIndex"}},[t._v("替换")])],1),t._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1),t._v(" "),i("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)])},staticRenderFns:[]};var r=i("VU/8")(s,n,!1,function(t){i("XpRR")},"data-v-010c1e9e",null);e.default=r.exports}});