webpackJsonp([12],{"+752":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-9a821f6a] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-9a821f6a] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},"9v9s":function(t,e,a){var o=a("+752");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("70094549",o,!0)},r56v:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("NYxO"),i=(a("jvWE"),{name:"",components:{Upload:a("TAej").a},data:function(){return{imgUrl:"",imgShow:!1,ImageURL:[],ImageURL1:[],roomName:"",total:0,hotelID:"",isLoading:!1,addDialog:!1,updateDialog:!1,formLabelWidth:"120px",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{ht_bt_HotelID:"",ht_bt_RoomName:"",ht_bt_BedType:"",ht_bt_MostIn:"",ht_bt_Level:"",ht_bt_ImagePath:"",ht_bt_Area:"",ht_bt_Smoke:"",ht_bt_AddBed:"",ht_bt_IsDelete:"",ht_bt_CreateTime:"",ht_bt_Remark:""}},imageObj:{accept:"image/*"},radioIndex:0,updateRadioIndex:0,isNewUploaNode:!0}},computed:Object(o.b)(["hotelRoomList","updateHotelRoomObj"]),created:function(){if(this.hotelID=sessionStorage.getItem("hotelID"),!this.hotelID)return this.$router.push({name:"HotelDetil"}),void this.$notify({message:"请先添加酒店信息!",position:"top-left",type:"error"});this.initData()},methods:{getData:function(t){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.ImageURL.push(t.data)},updateImage:function(t){this.updateRadioIndex?(this.ImageURL1.splice(this.updateRadioIndex-1,1,t.data),this.updateRadioIndex=""):this.ImageURL1.push(t.data)},deleteImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},deleteUpdateImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL1=this.ImageURL1.filter(function(e){return e!=t})},jump:function(t){var e=sessionStorage.getItem("hotelID");window.open("http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/"+e,"_blank")},toRoomNumber:function(t){this.$router.push({name:"HotelRoomNumber",params:{id:t}})},toRoomFacilities:function(t){this.$router.push({name:"HotelRoomRoomFacilities",params:{id:t}})},toRoomProduct:function(t){this.$router.push({name:"HotelRoomProduct",params:{id:t}})},lookImg:function(t){this.$store.commit("setTranstionFalse"),this.imgShow=!0,this.imgUrl=t},handleCurrentChange:function(t){this.initData("",t)},initData:function(t,e){var a=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",ht_bt_RoomID:"",ht_bt_HotelID:this.hotelID,ht_bt_RoomName:t||"",ht_bt_IsDelete:"",page:e||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initHotelRoom",o).then(function(t){a.total=t,a.isLoading=!1},function(t){a.$notify({message:t,type:"error"})})},search:function(){this.initData(this.roomName,1)},Add:function(){this.ImageURL=[],this.ImageURL1=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addOptions.data.ht_bt_HotelID=this.hotelID,this.addOptions.data.ht_bt_ImagePath=this.ImageURL.join(","),this.$store.dispatch("AddHotelRoom",this.addOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.roomName,1)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},Update:function(t){this.ImageURL1=t.ht_bt_ImagePath,this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.$store.commit("UpdateHotelRoom",t.ht_bt_RoomID)},updateSubmit:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",data:this.updateHotelRoomObj};e.data.ht_bt_ImagePath=this.ImageURL1.join(","),this.$store.dispatch("UpdateHotelRoom",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.roomName,1)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",data:{ht_bt_RoomID:t}};this.$store.dispatch("DeleteHotelRoom",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.roomName,1)},function(t){e.$notify({message:t,type:"error"})})}}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("酒店房间管理")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("房间名称筛选:")])]),t._v(" "),a("el-form-item",[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"房间名称",size:"small"},model:{value:t.roomName,callback:function(e){t.roomName=e},expression:"roomName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.hotelRoomList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"楼层:"}},[a("span",[t._v(t._s(e.row.ht_bt_Level))])]),t._v(" "),a("el-form-item",{attrs:{label:"房间图片:"}},t._l(e.row.ht_bt_ImagePath,function(e,o){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"}],staticStyle:{width:"100px",height:"100px","margin-right":"10px"},attrs:{alt:""},on:{click:function(a){t.lookImg(e)}}})})),t._v(" "),a("el-form-item",{attrs:{label:"面积:"}},[a("span",[t._v(t._s(e.row.ht_bt_Area)+"m"),a("sup",[t._v("2")])])]),t._v(" "),a("el-form-item",{attrs:{label:"无烟房:"}},[a("span",[t._v(t._s(e.row.ht_bt_Smoke))])]),t._v(" "),a("el-form-item",{attrs:{label:"加床:"}},[a("span",[t._v(t._s(e.row.ht_bt_AddBed))])]),t._v(" "),a("el-form-item",{attrs:{label:"最多入住数(人):"}},[a("span",[t._v(t._s(e.row.ht_bt_MostIn))])]),t._v(" "),a("el-form-item",{attrs:{label:"床型:"}},[a("span",[t._v(t._s(e.row.ht_bt_BedType))])]),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[a("span",[t._v(t._s(t._f("getUseTime")(e.row.ht_bt_CreateTime)))])]),t._v(" "),a("el-form-item",{attrs:{label:"备注:"}},[a("span",[t._v(t._s(e.row.ht_bt_Remark))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"140",prop:"ht_bt_RoomID",label:"房间编码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ht_bt_RoomName",width:"140",label:"房间名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.Delete(e.row.ht_bt_RoomID)}}},[t._v("删除\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.toRoomProduct(e.row.ht_bt_RoomID)}}},[t._v("前往房间产品\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.toRoomFacilities(e.row.ht_bt_RoomID)}}},[t._v("前往房间房间设施\n        ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.jump(e.row)}}},[t._v("预览效果\n        ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"添加酒店房间",visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"房间名称:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_RoomName,callback:function(e){t.$set(t.addOptions.data,"ht_bt_RoomName",e)},expression:"addOptions.data.ht_bt_RoomName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"床型:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_BedType,callback:function(e){t.$set(t.addOptions.data,"ht_bt_BedType",e)},expression:"addOptions.data.ht_bt_BedType"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"最多入住数:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_MostIn,callback:function(e){t.$set(t.addOptions.data,"ht_bt_MostIn",e)},expression:"addOptions.data.ht_bt_MostIn"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"楼层:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_Level,callback:function(e){t.$set(t.addOptions.data,"ht_bt_Level",e)},expression:"addOptions.data.ht_bt_Level"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"面积(平方):","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_Area,callback:function(e){t.$set(t.addOptions.data,"ht_bt_Area",e)},expression:"addOptions.data.ht_bt_Area"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"无烟房:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_Smoke,callback:function(e){t.$set(t.addOptions.data,"ht_bt_Smoke",e)},expression:"addOptions.data.ht_bt_Smoke"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"加床:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_bt_AddBed,callback:function(e){t.$set(t.addOptions.data,"ht_bt_AddBed",e)},expression:"addOptions.data.ht_bt_AddBed"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"图片上传:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,o){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:o+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:","label-width":t.formLabelWidth}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.addOptions.data.ht_bt_CreateTime,callback:function(e){t.$set(t.addOptions.data,"ht_bt_CreateTime",e)},expression:"addOptions.data.ht_bt_CreateTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:t.addOptions.data.ht_bt_Remark,callback:function(e){t.$set(t.addOptions.data,"ht_bt_Remark",e)},expression:"addOptions.data.ht_bt_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"图片",visible:t.imgShow,width:"60%",center:""},on:{"update:visible":function(e){t.imgShow=e}}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.imgUrl,alt:""}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.imgShow=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imgShow=!1}}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"修改酒店房间",visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateHotelRoomObj}},[a("el-form-item",{attrs:{label:"房间名称:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_RoomName,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_RoomName",e)},expression:"updateHotelRoomObj.ht_bt_RoomName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"床型:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_BedType,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_BedType",e)},expression:"updateHotelRoomObj.ht_bt_BedType"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"最多入住数:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_MostIn,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_MostIn",e)},expression:"updateHotelRoomObj.ht_bt_MostIn"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"楼层:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_Level,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_Level",e)},expression:"updateHotelRoomObj.ht_bt_Level"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"面积(平方):","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_Area,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_Area",e)},expression:"updateHotelRoomObj.ht_bt_Area"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"无烟房:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_Smoke,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_Smoke",e)},expression:"updateHotelRoomObj.ht_bt_Smoke"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"加床:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomObj.ht_bt_AddBed,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_AddBed",e)},expression:"updateHotelRoomObj.ht_bt_AddBed"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"图片上传:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL1,function(e,o){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:o+1},model:{value:t.updateRadioIndex,callback:function(e){t.updateRadioIndex=e},expression:"updateRadioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"创建时间:","label-width":t.formLabelWidth}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.updateHotelRoomObj.ht_bt_CreateTime,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_CreateTime",e)},expression:"updateHotelRoomObj.ht_bt_CreateTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:t.updateHotelRoomObj.ht_bt_Remark,callback:function(e){t.$set(t.updateHotelRoomObj,"ht_bt_Remark",e)},expression:"updateHotelRoomObj.ht_bt_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,l,!1,function(t){a("9v9s")},"data-v-9a821f6a",null);e.default=s.exports}});