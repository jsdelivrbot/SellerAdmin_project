webpackJsonp([8],{LEaf:function(n,t,e){(n.exports=e("bKW+")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},P75C:function(n,t,e){var o=e("LEaf");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("6imX")("c581cdb2",o,!0)},RIDA:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("SJI6"),i={name:"",data:function(){return{pickerOptions:{disabledDate:function(n){return n.getTime()<Date.now()},shortcuts:[{text:"最近一周",onClick:function(n){var t=new Date,e=new Date;e.setTime(e.getTime()-6048e5),n.$emit("pick",[e,t])}},{text:"最近一个月",onClick:function(n){var t=new Date,e=new Date;e.setTime(e.getTime()-2592e6),n.$emit("pick",[e,t])}},{text:"最近三个月",onClick:function(n){var t=new Date,e=new Date;e.setTime(e.getTime()-7776e6),n.$emit("pick",[e,t])}}]},date:"",roomID:"",total:0,roomProductID:"",isLoading:!1,addDialog:!1,updateDialog:!1,formLabelWidth:"120px",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_rpp_ID:"",ht_rs_RoomEntityId:"",ht_rpp_BeginUseDate:"",ht_rpp_EndUseDate:""}}},computed:Object(o.mapGetters)(["hotelRoomNumberList"]),created:function(){var n=this.$route.params.id;if(!n)return this.$notify({message:"请先选择房间!",position:"top-left",type:"error"}),void this.$router.push({name:"HotelRoom"});var t=sessionStorage.getItem("roomProductID");if(!t)return this.$notify({message:"请先选择房间!",position:"top-left",type:"error"}),void this.$router.push({name:"HotelRoom"});this.roomProductID=t,this.roomID=n,this.initData(1)},methods:{jump:function(){var n=sessionStorage.getItem("hotelID");window.open("http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/"+n,"_blank")},goHotelRoomProduct:function(){this.$router.push({name:"HotelRoomProduct",params:{id:1378}})},goHotelRoomEntity:function(){this.$router.push({name:"HotelRoomEntity",params:{id:2906}})},handleCurrentChange:function(n){this.initData(n)},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",ht_rpp_ID:this.roomProductID,ht_rs_RoomEntityId:this.roomID,ht_rpp_BeginUseDate:"",ht_rpp_EndUseDate:"",page:n||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initHotelRoomNumber",e).then(function(n){t.total=n,t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})},Add:function(){for(var n in this.addOptions)"loginUserID"!=n&&"loginUserPass"!=n&&(this.addOptions[n]="");this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var n=this;this.addOptions.ht_rpp_ID=this.roomProductID,this.addOptions.ht_rs_RoomEntityId=this.roomID,this.addOptions.ht_rpp_BeginUseDate=this.date[0],this.addOptions.ht_rpp_EndUseDate=this.date[1],this.$store.dispatch("AddHotelRoomNumber",this.addOptions).then(function(t){n.$notify({message:t,type:"success"}),n.initData(1)},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1}}},a={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("el-breadcrumb",{staticStyle:{margin:"20px 0px 0px 20px"},attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home/hotelRoom"}}},[n._v("房间")]),n._v(" "),e("el-breadcrumb-item",{nativeOn:{click:function(t){n.goHotelRoomProduct(t)}}},[n._v("酒店房间产品")]),n._v(" "),e("el-breadcrumb-item",{nativeOn:{click:function(t){n.goHotelRoomEntity(t)}}},[n._v("酒店房间实体")]),n._v(" "),e("el-breadcrumb-item",[n._v("酒店生成房间数")])],1),n._v(" "),e("h1",{staticClass:"userClass",staticStyle:{"font-size":"20px"}},[n._v("酒店生成房间管理")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item"),n._v(" "),e("el-form-item"),n._v(" "),e("el-form-item",{staticStyle:{float:"right"}},[e("el-button",{attrs:{type:"primary",size:"mini "},on:{click:n.Add}},[n._v("生成房间")]),n._v(" "),e("el-button",{staticStyle:{"margin-right":"80px"},attrs:{type:"success",size:"mini"},on:{click:n.jump}},[n._v("预览效果\n        ")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.hotelRoomNumberList}},[e("el-table-column",{attrs:{prop:"ht_rs_ID",label:"生成房间ID",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"使用时间",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("span",[n._v(n._s(n._f("getUseTime")(t.row.ht_rs_UseDate)))])]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"房间状态",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("span",[n._v(n._s(n._f("getLockStatus")(t.row.ht_rs_LockStatus)))])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),e("el-dialog",{attrs:{title:"生成房间",visible:n.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"日期选择:","label-width":n.formLabelWidth}},[e("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd","picker-options":n.pickerOptions},model:{value:n.date,callback:function(t){n.date=t},expression:"date"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=e("XAIM")(i,a,!1,function(n){e("P75C")},"data-v-d135c400",null);t.default=s.exports}});