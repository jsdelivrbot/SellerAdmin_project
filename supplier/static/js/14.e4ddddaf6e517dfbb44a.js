webpackJsonp([14],{bI7P:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("pFYg"),i=e.n(o),a=e("NYxO"),s={name:"",data:function(){return{roomID:"",total:0,isLoading:!1,addDialog:!1,updateDialog:!1,formLabelWidth:"120px",RoomFacilitiesTypeID:"",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{ht_rth_RoomHardID:"",ht_rth_RoomID:"",ht_ht_hotelID:""}}}},computed:Object(a.b)(["hotelRoomRoomFacilitiesList","hotelRoomFacilitiesTypeList","roomFacilitiesList","hotelID","updateHotelRoomRoomFacilitiesObj"]),created:function(){var n=this.$route.params.id;if(!n)return this.$notify({message:"请先选择房间!",position:"top-left",type:"error"}),void this.$router.push({name:"HotelRoom"});this.roomID=n,this.initData(1),this.initFacilitiesType()},methods:{jump:function(n){var t=sessionStorage.getItem("hotelID");window.open("http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/"+t,"_blank")},initFacilitiesType:function(){this.$store.dispatch("initHotelRoomFacilitiesType",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_rht_ID:"",ht_rht_Name:""})},changeRoomFacilities:function(){var n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",ht_rh_ID:"",ht_rh_Name:"",ht_rh_RoomHardTypeID:this.RoomFacilitiesTypeID,ht_rh_IsHot:""};this.$store.dispatch("initRoomFacilities",n)},handleCurrentChange:function(n){this.initData(n)},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_rth_ID:"",ht_rth_RoomHardID:"",ht_rth_RoomID:this.roomID,ht_ht_hotelID:"",page:n||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initHotelRoomRoomFacilities",e).then(function(n){t.total=n,t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})},search:function(){},Add:function(){for(var n in this.addOptions.data)if("object"==i()(this.addOptions.data[n]))for(var t in this.addOptions.data[n])this.addOptions.data[n][t]="";else this.addOptions.data[n]="";this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var n=this;this.addOptions.data.ht_ht_hotelID=this.hotelID,this.addOptions.data.ht_rth_RoomID=this.roomID,this.$store.dispatch("AddHotelRoomRoomFacilities",this.addOptions).then(function(t){n.$notify({message:t,type:"success"}),n.initData(1)},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},Update:function(n){this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.$store.commit("UpdateHotelRoomRoomFacilities",n)},updateSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:this.updateHotelRoomRoomFacilitiesObj};this.$store.dispatch("UpdateHotelRoomRoomFacilities",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(1)},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",data:{ht_rth_ID:n}};this.$store.dispatch("DeleteHotelRoomRoomFacilities",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData(1)},function(n){t.$notify({message:n,type:"error"})})}}},l={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("el-breadcrumb",{staticStyle:{margin:"20px 0px 0px 20px"},attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home/hotelRoom/"}}},[n._v("房间")]),n._v(" "),e("el-breadcrumb-item",[n._v("酒店房间设施")])],1),n._v(" "),e("h1",{staticClass:"userClass"},[n._v("酒店房间设施管理")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item"),n._v(" "),e("el-form-item"),n._v(" "),e("el-form-item",{staticStyle:{float:"right"}},[e("el-button",{staticStyle:{"margin-right":"80px"},attrs:{type:"primary",size:"small"},on:{click:n.Add}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.hotelRoomRoomFacilitiesList}},[e("el-table-column",{attrs:{prop:"ht_rth_ID",label:"房间房间设施ID",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_rth_RoomHardName",label:"房间设施名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"ht_rth_RoomHardTypeName",label:"房间设施类型名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.Update(t.row.ht_rth_ID)}}},[n._v("修改\n        ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.Delete(t.row.ht_rth_ID)}}},[n._v("删除\n        ")]),n._v(" "),e("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){n.jump(t.row)}}},[n._v("预览效果\n        ")])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加房间设施",visible:n.addDialog},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"房间设施类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择类型"},on:{change:n.changeRoomFacilities},model:{value:n.RoomFacilitiesTypeID,callback:function(t){n.RoomFacilitiesTypeID=t},expression:"RoomFacilitiesTypeID"}},n._l(n.hotelRoomFacilitiesTypeList,function(n){return e("el-option",{key:n.ht_rht_ID,attrs:{label:n.ht_rht_Name,value:n.ht_rht_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"房间设施:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.addOptions.data.ht_rth_RoomHardID,callback:function(t){n.$set(n.addOptions.data,"ht_rth_RoomHardID",t)},expression:"addOptions.data.ht_rth_RoomHardID"}},n._l(n.roomFacilitiesList,function(n){return e("el-option",{key:n.ht_rh_ID,attrs:{label:n.ht_rh_Name,value:n.ht_rh_ID}})}))],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改房间设施",visible:n.updateDialog},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateHotelRoomRoomFacilitiesObj}},[e("el-form-item",{attrs:{label:"房间设施类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择类型"},on:{change:n.changeRoomFacilities},model:{value:n.RoomFacilitiesTypeID,callback:function(t){n.RoomFacilitiesTypeID=t},expression:"RoomFacilitiesTypeID"}},n._l(n.hotelRoomFacilitiesTypeList,function(n){return e("el-option",{key:n.ht_rht_ID,attrs:{label:n.ht_rht_Name,value:n.ht_rht_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"房间设施:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.updateHotelRoomRoomFacilitiesObj.ht_rth_RoomHardID,callback:function(t){n.$set(n.updateHotelRoomRoomFacilitiesObj,"ht_rth_RoomHardID",t)},expression:"updateHotelRoomRoomFacilitiesObj.ht_rth_RoomHardID"}},n._l(n.roomFacilitiesList,function(n){return e("el-option",{key:n.ht_rh_ID,attrs:{label:n.ht_rh_Name,value:n.ht_rh_ID}})}))],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=e("VU/8")(s,l,!1,function(n){e("kIOJ")},"data-v-a99c2594",null);t.default=r.exports},duZ5:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},kIOJ:function(n,t,e){var o=e("duZ5");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("33e24e62",o,!0)}});