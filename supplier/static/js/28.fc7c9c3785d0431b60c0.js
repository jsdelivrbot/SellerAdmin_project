webpackJsonp([28],{"2pa+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("pFYg"),o=a.n(i),s=a("NYxO"),n=(a("jvWE"),{name:"",components:{Upload:a("TAej").a},data:function(){return{ImageURL:[],ImageURL1:[],hotelID:"",isLoading:!1,imgShow:!1,imgUrl:"",addDialog:!1,updateDialog:!1,formLabelWidth:"120px",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{ht_hi_HotelID:"",ht_hi_ImageTypeID:"",ht_hi_ImageURL:"",ht_hi_Remark:""}},imageObj:{accept:"image/*"},radioIndex:0,updateRadioIndex:0,isNewUploaNode:!0}},computed:Object(s.b)(["hotelImageTypeList","hotelImageList","updateHotelImageObj"]),created:function(){if(this.hotelID=sessionStorage.getItem("hotelID"),!this.hotelID)return this.$router.push({name:"HotelDetil"}),void this.$notify({message:"请先添加酒店信息!",position:"top-left",type:"error"});this.initData(),this.initImageType()},methods:{getData:function(t){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.ImageURL.push(t.data)},updateImage:function(t){this.updateRadioIndex?(this.ImageURL1.splice(this.updateRadioIndex-1,1,t.data),this.updateRadioIndex=""):this.ImageURL1.push(t.data)},deleteImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},deleteUpdateImageURL:function(t){this.isNewUploaNode=!1,this.ImageURL1=this.ImageURL1.filter(function(e){return e!=t})},clickImg:function(t){this.$store.commit("setTranstionFalse"),this.imgUrl=t,this.imgShow=!0},jump:function(t){var e=sessionStorage.getItem("hotelID");window.open("http://hly.1000da.com.cn/index.html#/Comment/hotelDetalis/"+e,"_blank")},initImageType:function(){this.$store.dispatch("initHotelImageType",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",ht_it_ID:"",ht_hi_Name:""})},initData:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",ht_hi_ID:"",ht_hi_HotelID:this.hotelID,ht_hi_ImageTypeID:""};this.isLoading=!0,this.$store.dispatch("initHotelImage",e).then(function(){t.isLoading=!1},function(e){t.$notify({message:e,type:"error"})})},Add:function(){for(var t in this.addOptions.data)if("object"==o()(this.addOptions.data[t]))for(var e in this.addOptions.data[t])this.addOptions.data[t][e]="";else this.addOptions.data[t]="";this.ImageURL=[],this.ImageURL1=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addOptions.data.ht_hi_HotelID=this.hotelID,this.addOptions.data.ht_hi_ImageURL=this.ImageURL.join(","),this.$store.dispatch("AddHotelImage",this.addOptions).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},Update:function(t){this.ImageURL1=t.ht_hi_ImageURL,this.$store.commit("setTranstionFalse"),this.updateDialog=!0,this.$store.commit("updateHotelImage",t.ht_hi_ID)},updateSubmit:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:this.updateHotelImageObj};e.data.ht_hi_ImageURL=this.ImageURL1.join(","),this.$store.dispatch("UpdateHotelImage",e).then(function(e){t.$notify({message:e,type:"success"}),t.initData()},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},Delete:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"操作员编码",operateUserName:"操作员名称",pcName:"",data:{ht_hi_ID:t}};this.$store.dispatch("DeleteHotelImage",a).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})})}}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("div",{staticClass:"title clearfix",staticStyle:{padding:"20px"}},[a("h1",{staticStyle:{"font-size":"20px"}},[t._v("酒店图片信息")]),a("br"),a("br"),t._v(" "),a("el-button",{staticStyle:{float:"right","margin-right":"80px"},attrs:{type:"primary",size:"small"},on:{click:t.Add}},[t._v("新增")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.hotelImageList}},[a("el-table-column",{attrs:{prop:"ht_hi_ID",label:"图片编码",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ht_hi_ImageTypeName",label:"图片类型名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"点击查看大图",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.ht_hi_ImageURL,function(e,i){return a("img",{staticStyle:{width:"100px",cursor:"pointer","margin-right":"10px"},attrs:{src:e,title:"点击查看大图"},on:{click:function(a){t.clickImg(e)}}})})}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.Update(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.Delete(e.row.ht_hi_ID)}}},[t._v("删除\n        ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.jump(e.row)}}},[t._v("预览效果\n        ")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"图片",visible:t.imgShow,width:"60%",center:""},on:{"update:visible":function(e){t.imgShow=e}}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.imgUrl,alt:""}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.imgShow=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imgShow=!1}}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"添加酒店图片",visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"图片类型:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择类型"},model:{value:t.addOptions.data.ht_hi_ImageTypeID,callback:function(e){t.$set(t.addOptions.data,"ht_hi_ImageTypeID",e)},expression:"addOptions.data.ht_hi_ImageTypeID"}},t._l(t.hotelImageTypeList,function(t){return a("el-option",{key:t.ht_it_ID,attrs:{label:t.ht_hi_Name,value:t.ht_it_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"图片上传:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:t.addOptions.data.ht_hi_Remark,callback:function(e){t.$set(t.addOptions.data,"ht_hi_Remark",e)},expression:"addOptions.data.ht_hi_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改酒店图片",visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{attrs:{model:t.updateHotelImageObj}},[a("el-form-item",{attrs:{label:"图片类型:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择类型"},model:{value:t.updateHotelImageObj.ht_hi_ImageTypeID,callback:function(e){t.$set(t.updateHotelImageObj,"ht_hi_ImageTypeID",e)},expression:"updateHotelImageObj.ht_hi_ImageTypeID"}},t._l(t.hotelImageTypeList,function(t){return a("el-option",{key:t.ht_it_ID,attrs:{label:t.ht_hi_Name,value:t.ht_it_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"图片上传:","label-width":t.formLabelWidth}},[a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL1,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.updateRadioIndex,callback:function(e){t.updateRadioIndex=e},expression:"updateRadioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL1.length,expression:"ImageURL1.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:t.updateHotelImageObj.ht_hi_Remark,callback:function(e){t.$set(t.updateHotelImageObj,"ht_hi_Remark",e)},expression:"updateHotelImageObj.ht_hi_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(n,l,!1,function(t){a("7gXq")},"data-v-4bfabc4f",null);e.default=r.exports},"7gXq":function(t,e,a){var i=a("IvRw");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("8a28df22",i,!0)},IvRw:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-4bfabc4f] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-4bfabc4f] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])}});