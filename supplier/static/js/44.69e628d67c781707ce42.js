webpackJsonp([44],{"7f5L":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("//Fk"),i=a.n(s),o=a("NYxO"),l=a("jvWE"),n={name:"",data:function(){return{isUploaNode:!0,tableData:[],ImageURL:[],ImageURL1:[],formLabelWidth:"120px",total:0,siteName:"",isLoading:!1,addDialog:!1,updateDialog:!1,VideoNameObj:"",AudioNews:"",addOptions:{tm_se_Code:"",tm_se_Name:"",tm_se_HandX:"",tm_se_HandY:"",tm_se_Vedio:"",tm_se_Sound:"",tm_se_Intro:"",tm_se_Image:"",tm_se_Remark:""},updateOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{tm_se_ID:"",tm_se_Code:"002",tm_se_Name:"",tm_se_HandX:"",tm_se_HandY:"",tm_se_Vedio:"",tm_se_Sound:"",tm_se_Intro:"",tm_se_Image:"",tm_se_Remark:""}},Imgs:""}},computed:Object(o.b)(["ticketMapList"]),created:function(){this.id=this.$route.params.id,this.initData()},methods:{closeDialog:function(){this.ImageURL=[],this.ImageURL1=[],this.addDialog=!1},cacheForm:function(){this.ImageURL=[],this.ImageURL1=[],this.addDialog=!1},UpLoadvideo:function(){var t=this;this.$refs.videos&&this.uploadToOSS(this.$refs.videos.files[0]).then(function(e){t.updateOptions.data.tm_se_Vedio=e.data,t.$notify({message:"视频上传成功!",type:"success"})}),this.$refs.videos1&&this.uploadToOSS(this.$refs.videos1.files[0]).then(function(e){t.updateOptions.data.tm_se_Vedio=e.data,t.$notify({message:"视频上传成功!",type:"success"})})},uploadAudio:function(){var t=this;this.$refs.audios&&this.uploadToOSS(this.$refs.audios.files[0]).then(function(e){t.addOptions.tm_se_Sound=e.data,t.$notify({message:"音频上传成功!",type:"success"})}),this.$refs.audios1&&this.uploadToOSS(this.$refs.audios1.files[0]).then(function(e){t.$notify({message:"音频上传成功!",type:"success"}),t.updateOptions.data.tm_se_Sound=e.data})},uploadToOSS:function(t){return new i.a(function(e,a){var s=new FormData;s.append("fileToUpload",t);var i=new XMLHttpRequest;i.open("POST",l.a+"/OSSFile/PostToOSS"),i.send(s),i.onreadystatechange=function(){if(4==i.readyState&&200==i.status&&i.responseText){var t=i.responseText;e(JSON.parse(t))}}})},uploaNode:function(){var t=this;this.ImageURL=[],this.ImageURL1=[],setTimeout(function(){t.$refs.upload&&t.$refs.upload.addEventListener("change",function(e){for(var a=0;a<t.$refs.upload.files.length;a++)t.uploadToOSS(t.$refs.upload.files[a]).then(function(e){e?(t.ImageURL=[],t.ImageURL.push(e.data),t.$refs.upload.value="",t.isUploaNode=!1):t.$notify({message:"图片地址不存在!",type:"error"})})}),t.$refs.upload1&&t.$refs.upload1.addEventListener("change",function(e){for(var a=0;a<t.$refs.upload1.files.length;a++)t.uploadToOSS(t.$refs.upload1.files[a]).then(function(e){e?(t.ImageURL1=[],t.ImageURL1.push(e.data),t.$refs.upload.value="",t.isUploaNode=!1):t.$notify({message:"图片地址不存在!",type:"error"})})})},30)},handleCurrentChange:function(t){this.initData(this.siteName,t)},initData:function(t,e){var a=this,s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_se_ID:"",tm_se_Code:this.$route.params.id,tm_se_Name:t||"",page:e||1,rows:"5"};this.isLoading=!0,this.$store.dispatch("initTicketMap",s).then(function(t){a.isLoading=!1,a.total=t},function(t){a.$notify({message:t,type:"error"})})},deleteMap:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{tm_se_ID:t}};this.$store.dispatch("deleteTicketMap",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData()})},search:function(){this.initData(this.siteName)},Add:function(){this.$store.commit("setTranstionFalse"),this.addDialog=!0,this.isUploaNode&&this.uploaNode(),this.ImageURL=[],this.ImageURL1=[]},AddSubmit:function(){var t=this;this.addOptions.tm_se_Image=this.ImageURL.join(","),this.addOptions.tm_se_Code=this.$route.params.id;var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addTicketMap",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData()}),this.addDialog=!1},upDateSubmit:function(){var t=this;this.updateOptions.data.tm_se_Image=this.ImageURL1.join(","),this.$store.dispatch("upDateTicketMap",this.updateOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData()}),this.updateDialog=!1},Update:function(t){this.isUploaNode&&this.uploaNode(),this.ImageURL=[],this.ImageURL1=[],this.updateOptions.data=t,this.updateDialog=!0,this.$store.commit("setTranstionFalse")},Delete:function(t){this.deleteMap(t)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("导览信息")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("span",[t._v("导览名称筛选:")])]),t._v(" "),a("el-form-item",[a("el-input",{attrs:{size:"small"},model:{value:t.siteName,callback:function(e){t.siteName=e},expression:"siteName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"添加地图坐标信息",visible:t.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e},close:t.closeDialog}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"小景点名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_Name,callback:function(e){t.$set(t.addOptions,"tm_se_Name",e)},expression:"addOptions.tm_se_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的横坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_HandX,callback:function(e){t.$set(t.addOptions,"tm_se_HandX",e)},expression:"addOptions.tm_se_HandX"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的纵坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_HandY,callback:function(e){t.$set(t.addOptions,"tm_se_HandY",e)},expression:"addOptions.tm_se_HandY"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点介绍:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_Intro,callback:function(e){t.$set(t.addOptions,"tm_se_Intro",e)},expression:"addOptions.tm_se_Intro"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.addOptions.tm_se_Remark,callback:function(e){t.$set(t.addOptions,"tm_se_Remark",e)},expression:"addOptions.tm_se_Remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点图片:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("上传图片\n          "),a("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),t._v(" "),t._l(t.ImageURL,function(e){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"},{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:"",alt:""}})})],2),t._v(" "),a("el-form-item",{attrs:{label:"小景点音频:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("选择音频\n          "),a("input",{ref:"audios",attrs:{type:"file",name:"",multiple:""}})]),t._v(" "),a("span",{staticStyle:{display:"inline-block",height:"30px","margin-left":"40px","font-size":"18px"}},[t._v(t._s(t.AudioNews))]),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.uploadAudio}},[t._v("立即上传")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点视频:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("选择视频\n          "),a("input",{ref:"videos",attrs:{type:"file",name:"",multiple:""}})]),t._v(" "),a("span",{staticStyle:{display:"inline-block",height:"30px","margin-left":"40px","font-size":"18px"}},[t._v(t._s(t.VideoNameObj))]),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.UpLoadvideo}},[t._v("立即上传")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cacheForm}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.AddSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改地图坐标信息",visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateOptions}},[a("el-form-item",{attrs:{label:"小景点名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_Name,callback:function(e){t.$set(t.updateOptions.data,"tm_se_Name",e)},expression:"updateOptions.data.tm_se_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的横坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_HandX,callback:function(e){t.$set(t.updateOptions.data,"tm_se_HandX",e)},expression:"updateOptions.data.tm_se_HandX"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手绘图的纵坐标:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_HandY,callback:function(e){t.$set(t.updateOptions.data,"tm_se_HandY",e)},expression:"updateOptions.data.tm_se_HandY"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点介绍:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_Intro,callback:function(e){t.$set(t.updateOptions.data,"tm_se_Intro",e)},expression:"updateOptions.data.tm_se_Intro"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.updateOptions.data.tm_se_Remark,callback:function(e){t.$set(t.updateOptions.data,"tm_se_Remark",e)},expression:"updateOptions.data.tm_se_Remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点图片:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("上传图片\n          "),a("input",{ref:"upload1",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),t._v(" "),t._l(t.ImageURL1,function(e){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"},{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:"",alt:""}})})],2),t._v(" "),a("el-form-item",{attrs:{label:"小景点音频:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("选择音频\n          "),a("input",{ref:"audios1",attrs:{type:"file",name:"",multiple:""}})]),t._v(" "),a("span",{staticStyle:{display:"inline-block",height:"30px","margin-left":"40px","font-size":"18px"}},[t._v(t._s(t.AudioNews))]),t._v(" "),a("el-form-item",{attrs:{size:"large"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.uploadAudio}},[t._v("立即上传")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"小景点视频:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("选择视频\n          "),a("input",{ref:"videos1",attrs:{type:"file",name:"",multiple:""}})]),t._v(" "),a("span",{staticStyle:{display:"inline-block",height:"30px","margin-left":"40px","font-size":"18px"}},[t._v(t._s(t.VideoNameObj))]),t._v(" "),a("el-form-item",{attrs:{size:"small"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.UpLoadvideo}},[t._v("立即上传")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.upDateSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.ticketMapList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"景点编码"}},[a("span",[t._v(t._s(e.row.tm_se_ID))])]),t._v(" "),a("el-form-item",{attrs:{label:"手绘图横坐标"}},[a("span",[t._v(t._s(e.row.tm_se_HandX))])]),t._v(" "),a("el-form-item",{attrs:{label:"手绘图纵坐标"}},[a("span",[t._v(t._s(e.row.tm_se_HandY))])]),t._v(" "),a("el-form-item",{attrs:{label:"景点视频"}},[a("span",[t._v(t._s(e.row.tm_se_Vedio))])]),t._v(" "),a("el-form-item",{attrs:{label:"景点音乐"}},[a("span",[t._v(t._s(e.row.tm_se_Sound))])]),t._v(" "),a("el-form-item",{attrs:{label:"景点图片"}},[a("span",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.row.tm_se_Image,expression:"props.row.tm_se_Image"}],attrs:{alt:"",width:"120",height:"80"}})])]),t._v(" "),a("el-form-item",{attrs:{label:"景点介绍"}},[a("span",[a("el-popover",{attrs:{placement:"top-start",width:"500",title:"景点介绍",trigger:"hover",content:e.row.tm_se_Intro}},[a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("移入查看")])],1)],1)])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"小景点编号",prop:"tm_se_ID"}}),t._v(" "),a("el-table-column",{attrs:{label:"景点名称",prop:"tm_se_Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-popover",{attrs:{placement:"top-start",width:"500",trigger:"hover",content:e.row.tm_se_Remark}},[a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("移入查看")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.Delete(e.row.tm_se_ID)}}},[t._v("删除\n        ")])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"block",staticStyle:{float:"right"}},[a("el-pagination",{attrs:{"page-size":5,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var d=a("VU/8")(n,r,!1,function(t){a("MR3M")},"data-v-2305d28a",null);e.default=d.exports},ELOm:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.el-upload__input[data-v-2305d28a]{\n  display: none !important;\n}\n.demo-table-expand[data-v-2305d28a] {\n  font-size: 0;\n}\n.demo-table-expand label[data-v-2305d28a] {\n  /*width: 100px;*/\n  color: #99a9bf;\n}\n\n/*.demo-table-expand label {*/\n\n/*width: 90px;*/\n\n/*color: #99a9bf;*/\n\n/*}*/\n.demo-table-expand .el-form-item[data-v-2305d28a] {\n  margin-right: 0;\n  margin-bottom: 0;\n  width: 50%;\n}\n",""])},MR3M:function(t,e,a){var s=a("ELOm");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("2bff6f66",s,!0)}});