webpackJsonp([11],{FV8t:function(t,e,a){var o=a("HH3m");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("19de8c8e",o,!0)},HH3m:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-bb7de28e] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-bb7de28e] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},a1Be:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("NYxO"),i=(a("jvWE"),{name:"",components:{Upload:a("TAej").a},computed:Object(o.b)(["foodStoreInformtionList","foodStoreRoomList","foodRoomPictureList"]),data:function(){return{isLoading:!1,storeId:"",roomId:"",formLabelWidth:"120px",total:0,addOptions:{fd_ri_RoomID:"",fd_ri_Image:"",fd_ri_Remark:""},addDialog:!1,updateDialog:!1,updateObj:{},bigPictureDialog:!1,imgUrl:"",ImageURL:[],ImageURL1:[],radioIndex:0,updateRadioIndex:0,isNewUploaNode:!0,userInfo:{},imageObj:{accept:"image/*"}}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.foodStoreInformtionList.length||this.initFoodStoreInformtion(),this.initData()},methods:{getData:function(t){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.ImageURL.push(t.data)},getUpdateData:function(t){this.updateRadioIndex?(this.ImageURL1.splice(this.updateRadioIndex-1,1,t.data),this.updateRadioIndex=""):this.ImageURL1.push(t.data)},deleteImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},deleteUpdateImageURL:function(t){console.log(1),this.isNewUploaNode=!1,this.ImageURL1=this.ImageURL1.filter(function(e){return e!=t})},handleCurrentChange:function(t){this.initData(this.storeId,t)},initFoodStoreInformtion:function(){var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sf_TradeID:this.userInfo.sm_ui_ID};this.$store.dispatch("initFoodStoreInformtion",t)},changeRoom:function(t){this.initRoomData(t)},initRoomData:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",fd_sfr_ID:"",fd_sfr_StoreFrontID:t||"",fd_sfr_RoomName:""};this.$store.dispatch("initFoodStoreRoom",a).then(function(t){e.total=t},function(t){e.$notify({message:t,type:"error"})})},initData:function(t,e){var a=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",page:e||1,rows:"5",fd_ri_ID:"",fd_ri_RoomID:t||"",agentID:this.userInfo.sm_ui_ID};this.isLoading=!0,this.$store.dispatch("initFoodRoomPicture",o).then(function(t){a.isLoading=!1,a.total=t},function(t){})},search:function(){this.initData(this.roomId)},displayBigPicture:function(t){this.$store.commit("setTranstionFalse"),this.imgUrl=t,this.bigPictureDialog=!0},add:function(){for(var t in this.addOptions)this.addOptions[t]="";this.ImageURL=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addOptions.fd_ri_Image=this.ImageURL.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addFoodRoomPicture",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.addOptions.fd_ri_RoomID)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},update:function(t){this.updateObj=t,this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.ImageURL1=t.fd_ri_Image.split(",")},updateSubmit:function(){var t=this;this.updateObj.fd_ri_Image=this.ImageURL1.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateObj};this.$store.dispatch("updateFoodRoomPicture",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.updateObj.fd_ri_RoomID)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_ri_ID:t||""}};this.$store.dispatch("deleteFoodRoomPicture",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.roomId)},function(t){e.$notify({message:t,type:"error"})})}}}),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("店面房间图片")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("店面名称筛选:")])]),t._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择店面",size:"small"},on:{change:t.changeRoom},model:{value:t.storeId,callback:function(e){t.storeId=e},expression:"storeId"}},t._l(t.foodStoreInformtionList,function(t){return a("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择房间",size:"small"},model:{value:t.roomId,callback:function(e){t.roomId=e},expression:"roomId"}},t._l(t.foodStoreRoomList,function(t){return a("el-option",{key:t.fd_sfr_ID,attrs:{label:t.fd_sfr_RoomName,value:t.fd_sfr_ID}})}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.add}},[t._v("添加")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.foodRoomPictureList}},[a("el-table-column",{attrs:{prop:"fd_sfr_RoomName",label:"房间名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fd_ri_Remark",label:"备注",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"房间图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:e.row.fd_ri_Image,width:"128",height:"80"},on:{click:function(a){t.displayBigPicture(e.row.fd_ri_Image)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.update(e.row)}}},[t._v("修改\n          ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.Delete(e.row.fd_ri_ID)}}},[t._v("删除\n          ")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"显示大图",visible:t.bigPictureDialog,width:"50%"},on:{"update:visible":function(e){t.bigPictureDialog=e}}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgUrl,expression:"imgUrl"}],attrs:{width:"100%"}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.bigPictureDialog=!1}}},[t._v("取 消")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"添加店面房间图片",visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"请选择店面:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择店面"},on:{change:t.changeRoom},model:{value:t.storeId,callback:function(e){t.storeId=e},expression:"storeId"}},t._l(t.foodStoreInformtionList,function(t){return a("el-option",{key:t.fd_sf_ID,attrs:{label:t.fd_sf_ProductName,value:t.fd_sf_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"店面房间:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择房间"},model:{value:t.addOptions.fd_ri_RoomID,callback:function(e){t.$set(t.addOptions,"fd_ri_RoomID",e)},expression:"addOptions.fd_ri_RoomID"}},t._l(t.foodStoreRoomList,function(t){return a("el-option",{key:t.fd_sfr_ID,attrs:{label:t.fd_sfr_RoomName,value:t.fd_sfr_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"房间图片:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,o){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:o+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.fd_ri_Remark,callback:function(e){t.$set(t.addOptions,"fd_ri_Remark",e)},expression:"addOptions.fd_ri_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改店面房间图片",visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateObj}},[a("el-form-item",{attrs:{label:"店面房间:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择房间"},model:{value:t.updateObj.fd_ri_RoomID,callback:function(e){t.$set(t.updateObj,"fd_ri_RoomID",e)},expression:"updateObj.fd_ri_RoomID"}},t._l(t.foodStoreRoomList,function(t){return a("el-option",{key:t.fd_sfr_ID,attrs:{label:t.fd_sfr_RoomName,value:t.fd_sfr_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"房间图片:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getUpdateData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL1,function(e,o){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:o+1},model:{value:t.updateRadioIndex,callback:function(e){t.updateRadioIndex=e},expression:"updateRadioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateObj.fd_ri_Remark,callback:function(e){t.$set(t.updateObj,"fd_ri_Remark",e)},expression:"updateObj.fd_ri_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)])},staticRenderFns:[]};var r=a("VU/8")(i,s,!1,function(t){a("FV8t")},"data-v-bb7de28e",null);e.default=r.exports}});