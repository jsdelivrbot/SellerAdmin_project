webpackJsonp([22],{"JzI/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("pFYg"),i=a.n(o),n=a("//Fk"),s=a.n(n),r=a("NYxO"),l=a("jvWE"),d={name:"",components:{Upload:a("TAej").a},data:function(){return{houseName:"",roomProductID:"",total:0,ImageURL:[],ImageURL1:[],isLoading:!1,addDialog:!1,updateDialog:!1,formLabelWidth:"120px",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{ht_rpp_ID:"",ht_re_HouseNumber:"",ht_re_ImagePath:""}},imageObj:{accept:"image/*"},radioIndex:0,updateRadioIndex:0,isNewUploaNode:!0}},computed:Object(r.b)(["hotelRoomEntityList","updateHotelRoomEntityObj"]),created:function(){var t=this.$route.params.id;if(!t)return this.$notify({message:"请先选择房间产品!",position:"top-left",type:"error"}),void this.$router.push({name:"HotelRoomProduct"});this.roomProductID=t,this.initData("",1)},methods:{getData:function(t){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.ImageURL.push(t.data)},updateImage:function(t){this.updateRadioIndex?(this.ImageURL1.splice(this.updateRadioIndex-1,1,t.data),this.updateRadioIndex=""):this.ImageURL1.push(t.data)},deleteImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},deleteUpdateImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL1=this.ImageURL1.filter(function(e){return e!=t})},jump:function(t){var e=sessionStorage.getItem("hotelID");window.open("http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/"+e,"_blank")},goHotelRoomProduct:function(){this.$router.push({name:"HotelRoomProduct",params:{id:1378}})},toRoomNumber:function(t){this.$router.push({name:"HotelRoomNumber",params:{id:t}})},uploadImg:function(t){return new s.a(function(e,a){lrz(t).then(function(t){e(t.base64.split(",")[1])})})},uploadToOSS:function(t){return new s.a(function(e,a){var o=new FormData;o.append("fileToUpload",t);var i=new XMLHttpRequest;i.open("POST",l.a+"/OSSFile/PostToOSS"),i.send(o),i.onreadystatechange=function(){if(4==i.readyState&&200==i.status&&i.responseText){var t=i.responseText;e(JSON.parse(t))}}})},uploaNode:function(){var t=this;this.ImageURL=[],this.ImageURL1=[],setTimeout(function(){t.$refs.upload&&t.$refs.upload.addEventListener("change",function(e){for(var a=0;a<t.$refs.upload.files.length;a++)t.uploadToOSS(t.$refs.upload.files[a]).then(function(e){e?t.ImageURL.push(e.data):t.$notify({message:"图片地址不存在!",type:"error"})})}),t.$refs.upload1&&t.$refs.upload1.addEventListener("change",function(e){for(var a=0;a<t.$refs.upload1.files.length;a++)t.uploadToOSS(t.$refs.upload1.files[a]).then(function(e){e?t.ImageURL1.push(e.data):t.$notify({message:"图片地址不存在!",type:"error"})})})},30)},handleCurrentChange:function(t){this.initData(this.houseName,t)},initData:function(t,e){var a=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",page:e||1,rows:"10",ht_re_Id:"",ht_rpp_ID:this.roomProductID,ht_re_HouseNumber:t||"",ht_re_ImagePath:""};this.isLoading=!0,this.$store.dispatch("initHotelRoomEntity",o).then(function(t){a.total=t,a.isLoading=!1},function(t){a.$notify({message:t,type:"error"})})},search:function(){this.initData(this.houseName,1)},Add:function(){for(var t in this.addOptions.data)if("object"==i()(this.addOptions.data[t]))for(var e in this.addOptions.data[t])this.addOptions.data[t][e]="";else this.addOptions.data[t]="";this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addOptions.data.ht_re_ImagePath=this.ImageURL.join(","),this.addOptions.data.ht_rpp_ID=this.roomProductID,this.$store.dispatch("AddHotelRoomEntity",this.addOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.houseName,1)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},Update:function(t){this.ImageURL1=t.ht_re_ImagePath,this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.$store.commit("UpdateHotelRoomEntity",t.ht_re_Id)},updateSubmit:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:this.updateHotelRoomEntityObj};e.data.ht_re_ImagePath=this.ImageURL1.join(","),this.$store.dispatch("UpdateHotelRoomEntity",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.houseName,1)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"lb",pcName:"",data:{ht_re_Id:t}};this.$store.dispatch("DeleteHotelRoomEntity",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.houseName,1)},function(t){e.$notify({message:t,type:"error"})})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("el-breadcrumb",{staticStyle:{margin:"20px 0px 0px 20px"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home/hotelRoom/"}}},[t._v("房间")]),t._v(" "),a("el-breadcrumb-item",{nativeOn:{click:function(e){t.goHotelRoomProduct(e)}}},[t._v("酒店房间产品")]),t._v(" "),a("el-breadcrumb-item",[t._v("酒店房间实体")])],1),t._v(" "),a("h1",{staticClass:"userClass"},[t._v("酒店房间实体")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("房间门牌号筛选:")])]),t._v(" "),a("el-form-item",[a("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"房间门牌号",size:"small"},model:{value:t.houseName,callback:function(e){t.houseName=e},expression:"houseName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.hotelRoomEntityList}},[a("el-table-column",{attrs:{width:"140",prop:"ht_re_Id",label:"房间实体ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"140",prop:"ht_re_HouseNumber",label:"房间门牌号"}}),t._v(" "),a("el-table-column",{attrs:{label:"房间图片"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.ht_re_ImagePath,function(t,e){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"item"}],staticStyle:{height:"100px","margin-right":"10px"}})})}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.Delete(e.row.ht_re_Id)}}},[t._v("删除\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.toRoomNumber(e.row.ht_re_Id)}}},[t._v("前往生成房间数\n        ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.jump(e.row)}}},[t._v("预览效果\n        ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"添加酒店房间实体",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"房间门牌号:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.ht_re_HouseNumber,callback:function(e){t.$set(t.addOptions.data,"ht_re_HouseNumber",e)},expression:"addOptions.data.ht_re_HouseNumber"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"房间图片上传:","label-width":t.formLabelWidth}},[a("p",[t._v("单张图片不能大于600KB")]),t._v(" "),a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,o){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:o+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改酒店房间实体",visible:t.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateHotelRoomEntityObj}},[a("el-form-item",{attrs:{label:"房间门牌号:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateHotelRoomEntityObj.ht_re_HouseNumber,callback:function(e){t.$set(t.updateHotelRoomEntityObj,"ht_re_HouseNumber",e)},expression:"updateHotelRoomEntityObj.ht_re_HouseNumber"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"房间图片上传:","label-width":t.formLabelWidth}},[a("p",[t._v("单张图片不能大于600KB")]),t._v(" "),a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL1,function(e,o){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:o+1},model:{value:t.updateRadioIndex,callback:function(e){t.updateRadioIndex=e},expression:"updateRadioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(d,u,!1,function(t){a("RBXA")},"data-v-710189c0",null);e.default=m.exports},RBXA:function(t,e,a){var o=a("VSbh");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("d625d982",o,!0)},VSbh:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-710189c0] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-710189c0] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])}});