webpackJsonp([35],{MajP:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("NYxO"),o={name:"",data:function(){return{roomName:"",total:0,roomID:"",isLoading:!1,addDialog:!1,updateDialog:!1,formLabelWidth:"120px",BedTypeList:[{name:"单床",value:"1"},{name:"双床",value:"2"},{name:"三床",value:"3"}],BreakfastTypeList:[{name:"无早",value:"0"},{name:"单早",value:"1"},{name:"双早",value:"2"},{name:"三早",value:"3"},{name:"四早",value:"4"}],WAFIList:[{name:"免费WAFI",value:"0"},{name:"免费有线",value:"1"},{name:"收费有线",value:"2"}],CancelTypeList:[{name:"可取消",value:"0"},{name:"不可取消",value:"1"}],addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",data:{ht_rpp_RoomID:"",ht_rpp_Name:"",ht_rpp_BedType:"",ht_rpp_BreakfastType:"",ht_rpp_WafiType:"",ht_rpp_CancelType:"",ht_rpp_ProductPrice:"",ht_rpp_RoomNumber:""}}}},computed:Object(a.b)(["hotelRoomProductList","updateHotelRoomProductObj"]),created:function(){var n=this.$route.params.id;if(!n)return this.$notify({message:"请先选择房间!",position:"top-left",type:"error"}),void this.$router.push({name:"HotelRoom"});this.roomID=n,this.initData("",1)},methods:{toRoomEntity:function(n){sessionStorage.setItem("roomProductID",n.ht_rpp_ID),this.$router.push({name:"HotelRoomEntity",params:{id:n.ht_rpp_ID}})},toLotRoomNumber:function(n){this.$router.push({name:"HotelLotRoomNumber",params:{id:n}})},toRoomNumber:function(n){this.$router.push({name:"HotelRoomNumber",params:{id:n}})},handleCurrentChange:function(n){this.initData(this.roomName,n)},initData:function(n,t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_rpp_ID:"",ht_rpp_RoomID:this.roomID,ht_rpp_Name:n||"",ht_rpp_BedType:"",ht_rpp_BreakfastType:"",ht_rpp_WafiType:"",ht_rpp_CancelType:"",ht_rpp_ProductPrice:"",page:t||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initHotelRoomProduct",a).then(function(n){e.total=n,e.isLoading=!1},function(n){e.$notify({message:n,type:"error"})})},search:function(){this.initData(this.roomName,1)},Add:function(){this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var n=this;this.addOptions.data.ht_rpp_RoomID=this.roomID,this.$store.dispatch("AddHotelRoomProduct",this.addOptions).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.roomName,1)},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},Update:function(n){this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.$store.commit("UpdateHotelRoomProduct",n)},updateSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:this.updateHotelRoomProductObj};this.$store.dispatch("UpdateHotelRoomProduct",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.roomName,1)},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",data:{ht_rpp_ID:n}};this.$store.dispatch("DeleteHotelRoomProduct",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData(t.roomName,1)},function(n){t.$notify({message:n,type:"error"})})}}},l={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("el-breadcrumb",{staticStyle:{margin:"20px 0px 0px 20px"},attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home/hotelRoom"}}},[n._v("房间")]),n._v(" "),e("el-breadcrumb-item",[n._v("酒店房间产品")])],1),n._v(" "),e("h1",{staticClass:"userClass"},[n._v("酒店房间产品管理")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("房间产品名称筛选:")])]),n._v(" "),e("el-form-item",[e("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"房间产品名称",size:"small"},model:{value:n.roomName,callback:function(t){n.roomName=t},expression:"roomName"}})],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.Add}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.hotelRoomProductList}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"床型:"}},[e("span",[n._v(n._s(n._f("getBedType")(t.row.ht_rpp_BedType)))])]),n._v(" "),e("el-form-item",{attrs:{label:"早餐:"}},[e("span",[n._v(n._s(n._f("getBreakfastType")(t.row.ht_rpp_BreakfastType)))])]),n._v(" "),e("el-form-item",{attrs:{label:"WAFI:"}},[e("span",[n._v(n._s(n._f("getWafiType")(t.row.ht_rpp_WafiType)))])]),n._v(" "),e("el-form-item",{attrs:{label:"取消类型:"}},[e("span",[n._v(n._s(n._f("getCancelType")(t.row.ht_rpp_CancelType)))])]),n._v(" "),e("el-form-item",{attrs:{label:"房间数量:"}},[e("span",[n._v(n._s(t.row.ht_rpp_RoomNumber)+"间")])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{width:"100",prop:"ht_rpp_ID",align:"center",label:"房间产品ID"}}),n._v(" "),e("el-table-column",{attrs:{width:"140",prop:"ht_rpp_Name",align:"center",label:"房间产品名称"}}),n._v(" "),e("el-table-column",{attrs:{width:"140",prop:"ht_rpp_ProductPrice",align:"center",label:"产品价格(元)"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.Update(t.row.ht_rpp_ID)}}},[n._v("修改\n        ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.Delete(t.row.ht_rpp_ID)}}},[n._v("删除\n        ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.toRoomEntity(t.row)}}},[n._v("前往房间实体\n        ")])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加酒店房间产品",visible:n.addDialog},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"房间产品名称:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.ht_rpp_Name,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_Name",t)},expression:"addOptions.data.ht_rpp_Name"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"床型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.addOptions.data.ht_rpp_BedType,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_BedType",t)},expression:"addOptions.data.ht_rpp_BedType"}},n._l(n.BedTypeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"早餐类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.addOptions.data.ht_rpp_BreakfastType,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_BreakfastType",t)},expression:"addOptions.data.ht_rpp_BreakfastType"}},n._l(n.BreakfastTypeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"WAFI:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.addOptions.data.ht_rpp_WafiType,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_WafiType",t)},expression:"addOptions.data.ht_rpp_WafiType"}},n._l(n.WAFIList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"取消类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.addOptions.data.ht_rpp_CancelType,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_CancelType",t)},expression:"addOptions.data.ht_rpp_CancelType"}},n._l(n.CancelTypeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"房间产品价格:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.ht_rpp_ProductPrice,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_ProductPrice",t)},expression:"addOptions.data.ht_rpp_ProductPrice"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"房间数量:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addOptions.data.ht_rpp_RoomNumber,callback:function(t){n.$set(n.addOptions.data,"ht_rpp_RoomNumber",t)},expression:"addOptions.data.ht_rpp_RoomNumber"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改酒店房间产品",visible:n.updateDialog},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateHotelRoomProductObj}},[e("el-form-item",{attrs:{label:"房间产品名称:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateHotelRoomProductObj.ht_rpp_Name,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_Name",t)},expression:"updateHotelRoomProductObj.ht_rpp_Name"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"床型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.updateHotelRoomProductObj.ht_rpp_BedType,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_BedType",t)},expression:"updateHotelRoomProductObj.ht_rpp_BedType"}},n._l(n.BedTypeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"早餐类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.updateHotelRoomProductObj.ht_rpp_BreakfastType,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_BreakfastType",t)},expression:"updateHotelRoomProductObj.ht_rpp_BreakfastType"}},n._l(n.BreakfastTypeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"WAFI:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.updateHotelRoomProductObj.ht_rpp_WafiType,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_WafiType",t)},expression:"updateHotelRoomProductObj.ht_rpp_WafiType"}},n._l(n.WAFIList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"取消类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.updateHotelRoomProductObj.ht_rpp_CancelType,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_CancelType",t)},expression:"updateHotelRoomProductObj.ht_rpp_CancelType"}},n._l(n.CancelTypeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.name,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"房间产品价格:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateHotelRoomProductObj.ht_rpp_ProductPrice,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_ProductPrice",t)},expression:"updateHotelRoomProductObj.ht_rpp_ProductPrice"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"房间数量:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateHotelRoomProductObj.ht_rpp_RoomNumber,callback:function(t){n.$set(n.updateHotelRoomProductObj,"ht_rpp_RoomNumber",t)},expression:"updateHotelRoomProductObj.ht_rpp_RoomNumber"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=e("VU/8")(o,l,!1,function(n){e("nJZk")},"data-v-33145e25",null);t.default=r.exports},"bH+j":function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},nJZk:function(n,t,e){var a=e("bH+j");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("167f5f50",a,!0)}});