webpackJsonp([21],{"06vP":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("//Fk"),o=a.n(i),n=a("NYxO"),s={name:"",data:function(){return{updateOptions:{},isShow:!0,formLabelWidth:"120px",addDialog:!1,updateDialog:!1,agentID:"",isLoading:!1,ImageURL:[],ImageURL1:[],addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{cr_h_AgentId:"",cr_h_Introduction:"",cr_h_Logo:"",cr_h_Name:"",cr_h_Notice:""}}}},computed:Object(n.b)(["carCompaniesList"]),created:function(){this.agentID=JSON.parse(sessionStorage.getItem("admin")).sm_ui_ID,this.addOptions.data.cr_h_AgentId=this.agentID,this.initData()},methods:{uploadImg:function(t){return new o.a(function(e,a){lrz(t).then(function(t){e(t.base64.split(",")[1])})})},uploaNode:function(){var t=this;this.ImageURL=[],this.ImageURL1=[],setTimeout(function(){t.$refs.upload&&t.$refs.upload.addEventListener("change",function(e){for(var a=0;a<t.$refs.upload.files.length;a++)t.uploadImg(t.$refs.upload.files[a]).then(function(e){t.$store.dispatch("CarUploadAdminImgs",{imageData:e}).then(function(e){e?(t.ImageURL=[],t.ImageURL.push(e.data)):t.$notify({message:"图片地址不存在!",type:"error"})})})}),t.$refs.upload1&&t.$refs.upload1.addEventListener("change",function(e){for(var a=0;a<t.$refs.upload1.files.length;a++)t.uploadImg(t.$refs.upload1.files[a]).then(function(e){t.$store.dispatch("CarUploadAdminImgs",{imageData:e}).then(function(e){e?(t.ImageURL1=[],t.ImageURL1.push(e.data)):t.$notify({message:"图片地址不存在!",type:"error"})})})})},30)},initData:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",cr_h_AgentId:this.agentID};this.isLoading=!0,this.$store.dispatch("initCarCompanies",e).then(function(e){t.isLoading=!1,sessionStorage.setItem("carCompaniesID",e),t.isShow=!e},function(e){console.log(e),t.$notify({message:e,type:"error"})})},addButton:function(){this.ImageURL=[],this.ImageURL1=[],this.addDialog=!0,this.uploaNode(),this.$store.commit("setTranstionFalse")},addSubmit:function(){var t=this;this.addOptions.data.cr_h_Logo=this.ImageURL.join(","),this.$store.dispatch("addCarHomeSubmit",this.addOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},Update:function(t){this.ImageURL=[],this.ImageURL1=[],this.updateOptions=t,this.updateDialog=!0,this.uploaNode(),this.$store.commit("setTranstionFalse")},updateSubmit:function(){var t=this;this.updateOptions.cr_h_Logo=this.ImageURL1.join(",");var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:this.updateOptions};this.$store.dispatch("UpdateCarHomeSubmit",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("div",{staticClass:"title clearfix",staticStyle:{padding:"20px"}},[a("h1",[t._v("租车公司基本信息")]),a("br"),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],attrs:{type:"primary",size:"small"},on:{click:t.addButton}},[t._v("添加")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"},{name:"show",rawName:"v-show",value:!t.isShow,expression:"!isShow"}],staticStyle:{width:"100%"},attrs:{data:t.carCompaniesList}},[a("el-table-column",{attrs:{width:"140",align:"center",label:"租车公司编号",prop:"cr_h_Id"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"公司名称",prop:"cr_h_Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"公司简介",align:"center",prop:"cr_h_Introduction"}}),t._v(" "),a("el-table-column",{attrs:{label:"图标",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.row.cr_h_Logo,expression:"scope.row.cr_h_Logo"}],attrs:{width:"128",height:"80"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"租车须知",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-popover",{attrs:{placement:"top-start",title:"租车须知",width:"500",trigger:"hover",content:e.row.cr_h_Notice}},[a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("移入查看租车须知")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n        ")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"添加租车信息",visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"供应商ID:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:t.addOptions.data.cr_h_AgentId,callback:function(e){t.$set(t.addOptions.data,"cr_h_AgentId",e)},expression:"addOptions.data.cr_h_AgentId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公司名称:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.addOptions.data.cr_h_Name,callback:function(e){t.$set(t.addOptions.data,"cr_h_Name",e)},expression:"addOptions.data.cr_h_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公司图标:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("上传图标\n          "),a("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),t._v(" "),t._l(t.ImageURL,function(e){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"},{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:"",alt:""}})})],2),t._v(" "),a("el-form-item",{attrs:{label:"公司简介:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{rows:5,type:"textarea"},model:{value:t.addOptions.data.cr_h_Introduction,callback:function(e){t.$set(t.addOptions.data,"cr_h_Introduction",e)},expression:"addOptions.data.cr_h_Introduction"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"租车须知:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{rows:5,type:"textarea"},model:{value:t.addOptions.data.cr_h_Notice,callback:function(e){t.$set(t.addOptions.data,"cr_h_Notice",e)},expression:"addOptions.data.cr_h_Notice"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改租车信息",visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateOptions}},[a("el-form-item",{attrs:{label:"供应商ID:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:t.updateOptions.cr_h_AgentId,callback:function(e){t.$set(t.updateOptions,"cr_h_AgentId",e)},expression:"updateOptions.cr_h_AgentId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公司名称:","label-width":t.formLabelWidth}},[a("el-input",{model:{value:t.updateOptions.cr_h_Name,callback:function(e){t.$set(t.updateOptions,"cr_h_Name",e)},expression:"updateOptions.cr_h_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"公司图标:","label-width":t.formLabelWidth}},[a("a",{staticClass:"file",attrs:{href:"javascript:;"}},[t._v("上传图标\n          "),a("input",{ref:"upload1",attrs:{type:"file",name:"",accept:"image/*",multiple:""}})]),t._v(" "),t._l(t.ImageURL1,function(e){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"item"},{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:"",alt:""}})})],2),t._v(" "),a("el-form-item",{attrs:{label:"公司简介:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{rows:5,type:"textarea"},model:{value:t.updateOptions.cr_h_Introduction,callback:function(e){t.$set(t.updateOptions,"cr_h_Introduction",e)},expression:"updateOptions.cr_h_Introduction"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"租车须知:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{rows:5,type:"textarea"},model:{value:t.updateOptions.cr_h_Notice,callback:function(e){t.$set(t.updateOptions,"cr_h_Notice",e)},expression:"updateOptions.cr_h_Notice"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(s,r,!1,function(t){a("Am3N")},"data-v-86810d44",null);e.default=l.exports},Am3N:function(t,e,a){var i=a("f5kp");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("13a79248",i,!0)},f5kp:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,'\n.demo-table-expand[data-v-86810d44] {\n  font-size: 0;\n}\n.demo-table-expand label[data-v-86810d44] {\n  width: 90px;\n  color: #99a9bf;\n}\n.demo-table-expand .el-form-item[data-v-86810d44] {\n  margin-right: 0;\n  margin-bottom: 0;\n  width: 50%;\n}\n.title > h1[data-v-86810d44] {\n  float: left;\n  font: 20px/2 "\\5FAE\\8F6F\\96C5\\9ED1";\n  color: #000;\n}\n.title > button[data-v-86810d44] {\n  float: right;\n}\n',""])}});