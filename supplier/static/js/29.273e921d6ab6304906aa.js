webpackJsonp([29],{"7f5L":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("NYxO"),i=(a("jvWE"),{name:"",components:{Upload:a("TAej").a},data:function(){return{imageObj:{accept:"image/*"},audioObj:{accept:"audio/*"},videoObj:{accept:"video/*"},isShow:!1,isUploaNode:!0,isNewUploaNode:!0,tableData:[],ImageURL:[],updateImageURL:[],formLabelWidth:"120px",total:0,siteName:"",isLoading:!1,addDialog:!1,updateDialog:!1,VideoNameObj:"",AudioNews:"",addOptions:{tm_se_Code:"",tm_se_Name:"",tm_se_HandX:"",tm_se_HandY:"",tm_se_Vedio:"",tm_se_Sound:"",tm_se_Intro:"",tm_se_Image:"",tm_se_Remark:""},updateOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{tm_se_ID:"",tm_se_Code:"",tm_se_Name:"",tm_se_HandX:"",tm_se_HandY:"",tm_se_Vedio:"",tm_se_Sound:"",tm_se_Intro:"",tm_se_Image:"",tm_se_Remark:""}},Imgs:""}},computed:Object(s.b)(["ticketMapList"]),created:function(){this.id=this.$route.params.id,this.initData()},methods:{getData:function(t){this.ImageURL.push(t.data)},updateImage:function(t){this.updateImageURL.push(t.data)},passAudio:function(t){this.addOptions.tm_se_Sound=t.data},updateAudio:function(t){this.updateOptions.data.tm_se_Sound=t.data},passVideo:function(t){this.addOptions.tm_se_Vedio=t.data},updateVideo:function(t){this.updateOptions.data.tm_se_Vedio=t.data},deleteUpdateImageURL:function(t){this.isNewUploaNode=!1,this.updateImageURL=this.updateImageURL.filter(function(e){return e!=t})},deleteImageURL:function(t){this.isUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},closeDialog:function(){this.ImageURL=[],this.updateImageURL=[],this.addDialog=!1,this.updateDialog=!1},cacheForm:function(){this.ImageURL=[],this.updateImageURL=[],this.addDialog=!1,this.updateDialog=!1},handleCurrentChange:function(t){this.initData(this.siteName,t)},initData:function(t,e){var a=this,s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_se_ID:"",tm_se_Code:this.id,tm_se_Name:t||"",page:e||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initTicketMap",s).then(function(t){a.isLoading=!1,a.total=t},function(t){a.$notify({message:t,type:"error"})})},search:function(){this.initData(this.siteName)},Add:function(){this.$store.commit("setTranstionFalse"),this.addDialog=!0},AddSubmit:function(){var t=this;this.addOptions.tm_se_Image=this.ImageURL.join(","),this.addOptions.tm_se_Code=this.id;var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addTicketMap",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},Update:function(t){var e=this;this.updateOptions.data=t,setTimeout(function(){t.tm_se_Image&&(e.updateImageURL=t.tm_se_Image),e.updateDialog=!0},30)},updateSubmit:function(){var t=this;this.updateImageURL.length&&(this.updateOptions.data.tm_se_Image=this.updateImageURL.join(",")),this.$store.dispatch("upDateTicketMap",this.updateOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{tm_se_ID:t}};this.$store.dispatch("deleteTicketMap",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})})}}}),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("导览信息")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("导览名称筛选:")])]),t._v(" "),a("el-form-item",[a("el-input",{attrs:{size:"small"},model:{value:t.siteName,callback:function(e){t.siteName=e},expression:"siteName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"添加地图坐标信息",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e},close:t.closeDialog}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"小景点名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_Name,callback:function(e){t.$set(t.addOptions,"tm_se_Name",e)},expression:"addOptions.tm_se_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的横坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_HandX,callback:function(e){t.$set(t.addOptions,"tm_se_HandX",e)},expression:"addOptions.tm_se_HandX"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的纵坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_HandY,callback:function(e){t.$set(t.addOptions,"tm_se_HandY",e)},expression:"addOptions.tm_se_HandY"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点介绍:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_Intro,callback:function(e){t.$set(t.addOptions,"tm_se_Intro",e)},expression:"addOptions.tm_se_Intro"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_Remark,callback:function(e){t.$set(t.addOptions,"tm_se_Remark",e)},expression:"addOptions.tm_se_Remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点图片:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v("\n\n<<<<<<< Updated upstream\n\n          "),t._v(" "),t._v("\n=======\n          "),a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("上传图片\n            "),a("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}]},[t._v("正在上传图片文件...")]),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,s){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"30px"}},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}}),t._v(" "),a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")])])})),t._v("\n>>>>>>> Stashed changes\n\n        ")],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点音频:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.audioObj},on:{getData:t.passAudio}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点视频:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.videoObj},on:{getData:t.passVideo}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cacheForm}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.AddSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改地图坐标信息",visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateOptions}},[a("el-form-item",{attrs:{label:"小景点名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_Name,callback:function(e){t.$set(t.updateOptions.data,"tm_se_Name",e)},expression:"updateOptions.data.tm_se_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的横坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_HandX,callback:function(e){t.$set(t.updateOptions.data,"tm_se_HandX",e)},expression:"updateOptions.data.tm_se_HandX"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的纵坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_HandY,callback:function(e){t.$set(t.updateOptions.data,"tm_se_HandY",e)},expression:"updateOptions.data.tm_se_HandY"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点介绍:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_Intro,callback:function(e){t.$set(t.updateOptions.data,"tm_se_Intro",e)},expression:"updateOptions.data.tm_se_Intro"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_Remark,callback:function(e){t.$set(t.updateOptions.data,"tm_se_Remark",e)},expression:"updateOptions.data.tm_se_Remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点图片:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.updateImageURL,function(e,s){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"30px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.updateImageURL.length,expression:"updateImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点音频:","label-width":t.formLabelWidth}},[a("audio",{directives:[{name:"show",rawName:"v-show",value:t.updateOptions.data.tm_se_Sound,expression:"updateOptions.data.tm_se_Sound"}],attrs:{src:t.updateOptions.data.tm_se_Sound,controls:""}}),t._v(" "),a("Upload",{attrs:{attrs:t.audioObj},on:{getData:t.updateAudio}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点视频:","label-width":t.formLabelWidth}},[a("video",{directives:[{name:"show",rawName:"v-show",value:t.updateOptions.data.tm_se_Vedio,expression:"updateOptions.data.tm_se_Vedio"}],attrs:{src:t.updateOptions.data.tm_se_Vedio,controls:"",width:"100"}}),t._v(" "),a("Upload",{attrs:{attrs:t.videoObj},on:{getData:t.updateVideo}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.ticketMapList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"景点编码"}},[a("span",[t._v(t._s(e.row.tm_se_ID))])]),t._v(" "),a("el-form-item",{attrs:{label:"手绘图横坐标"}},[a("span",[t._v(t._s(e.row.tm_se_HandX))])]),t._v(" "),a("el-form-item",{attrs:{label:"手绘图纵坐标"}},[a("span",[t._v(t._s(e.row.tm_se_HandY))])]),t._v(" "),a("el-form-item",{attrs:{label:"景点视频"}},[a("video",{directives:[{name:"show",rawName:"v-show",value:e.row.tm_se_Vedio,expression:"props.row.tm_se_Vedio"}],attrs:{src:e.row.tm_se_Vedio,controls:"",width:"100"}})]),t._v(" "),a("el-form-item",{attrs:{label:"景点音乐"}},[a("audio",{directives:[{name:"show",rawName:"v-show",value:e.row.tm_se_Sound,expression:"props.row.tm_se_Sound"}],attrs:{src:e.row.tm_se_Sound,controls:""}})]),t._v(" "),a("el-form-item",{attrs:{label:"景点图片"}},[a("span",t._l(e.row.tm_se_Image,function(t,e){return a("img",{key:e,staticStyle:{margin:"10px 15px 0"},attrs:{src:t,alt:"",width:"200",height:"100"}})}))]),t._v(" "),a("el-form-item",{attrs:{label:"景点介绍"}},[a("span",[a("el-popover",{attrs:{placement:"top-start",width:"500",title:"景点介绍",trigger:"hover",content:e.row.tm_se_Intro}},[a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("移入查看")])],1)],1)])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"小景点编号",prop:"tm_se_ID"}}),t._v(" "),a("el-table-column",{attrs:{label:"景点名称",prop:"tm_se_Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-popover",{attrs:{placement:"top-start",width:"500",trigger:"hover",content:e.row.tm_se_Remark}},[a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("移入查看")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n          ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.Delete(e.row.tm_se_ID)}}},[t._v("删除\n          ")])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"block",staticStyle:{float:"right"}},[a("el-pagination",{attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var n=a("VU/8")(i,o,!1,function(t){a("odaG")},"data-v-51bf7b2d",null);e.default=n.exports},"Mnt+":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.el-upload__input[data-v-51bf7b2d] {\n  display: none !important;\n}\n.demo-table-expand[data-v-51bf7b2d] {\n  font-size: 0;\n}\n.demo-table-expand label[data-v-51bf7b2d] {\n  width: 100px;\n  color: #99a9bf;\n}\n.demo-table-expand .el-form-item[data-v-51bf7b2d] {\n  margin-right: 0;\n  margin-bottom: 0;\n  width: 50%;\n}\n.imgWap[data-v-51bf7b2d] {\n}\n.imgWap span[data-v-51bf7b2d] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n",""])},odaG:function(t,e,a){var s=a("Mnt+");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("0e69c6ad",s,!0)}});