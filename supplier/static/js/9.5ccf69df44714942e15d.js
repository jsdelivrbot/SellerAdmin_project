webpackJsonp([9],{"/P8k":function(n,e,t){var a=t("jjPs");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("2fadeba6",a,!0)},HkQh:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("//Fk"),s=t.n(a),i=t("NYxO"),o=t("jvWE"),r={data:function(){return{isDisabled:!0,updateDialog:!1,ImageURL:"",seriesName:"",parentTypeName:"",ImageURL1:[],isLoading:!1,total:0,addDialog:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_st_SeriesID:"1",vf_st_SeriesTypeID:"1"}},formLabelWidth:"120px",VMovieSeriesCategoriesUpdateObj:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_st_ID:"1",vf_st_SeriesID:"1",vf_st_SeriesTypeID:"1"}}}},computed:Object(i.b)(["VMovieVideoSeriesCategoriesList","VMovieSeries","VMovieTypeList","VMovieParentTypeList"]),created:function(){this.initData(),this.initSeriesName(0),this.initTypeName()},methods:{initSeriesName:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_ss_ID:"",vf_ss_Name:n||"",vf_ss_WriteState:"",vf_ss_AuthorID:""};this.$store.dispatch("initVMovieSeries",t).then(function(n){e.total=n},function(n){e.$notify({message:n,type:"error"})})},initTypeName:function(){var n=this;this.$store.dispatch("initVMovieSorting",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_te_ID:"",vf_te_Name:"",vf_te_ParentID:""}).then(function(e){n.total=e},function(e){n.$notify({message:e,type:"error"})})},handleCurrentChange:function(n){this.initData("","",n)},initData:function(n,e,t){var a=this;this.$store.dispatch("initVMovieSeriesCategories",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_st_ID:"",vf_st_SeriesID:"",vf_st_SeriesTypeID:"",page:1,rows:5}).then(function(n){a.total=n},function(n){a.$notify({message:n,type:"error"})})},search:function(){this.initData(this.seriesName,this.parentTypeName,"")},Add:function(){this.addDialog=!0,this.$store.commit("setTranstionFalse")},addSubmit:function(){var n=this;this.$store.dispatch("addVMovieSeriesCategories",this.addOptions).then(function(e){n.$notify({message:e,type:"success"}),n.initData("","",1)},function(e){n.$notify({message:e,type:"error"})}),this.addDialog=!1},uploadImg:function(n){return new s.a(function(e,t){lrz(n).then(function(n){e(n.base64.split(",")[1])})})},uploadToOSS:function(n){return new s.a(function(e,t){var a=new FormData;a.append("fileToUpload",n);var s=new XMLHttpRequest;s.open("POST",o.a+"/OSSFile/PostToOSS"),s.send(a),s.onreadystatechange=function(){if(4==s.readyState&&200==s.status){if(s.responseText){var n=s.responseText;e(JSON.parse(n))}}else console.log(s.responseText)}})},uploaNode:function(){var n=this;this.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",this.ImageURL1=[],setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(e){for(var t=0;t<n.$refs.upload.files.length;t++)n.uploadToOSS(n.$refs.upload.files[t]).then(function(e){n.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",e?n.addOptions.data.vf_ve_Content.vf_vo_ImageURL=e.data:n.$notify({message:"图片地址不存在!",type:"error"})})}),n.$refs.upload1&&n.$refs.upload1.addEventListener("change",function(e){for(var t=0;t<n.$refs.upload1.files.length;t++)n.uploadToOSS(n.$refs.upload1.files[t]).then(function(e){e?n.ImageURL1.push(e.data):n.$notify({message:"图片地址不存在!",type:"error"})})})},30)},Delete:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_st_ID:n}};this.$store.dispatch("DeleteVMovieSeriesCategories",t).then(function(n){e.$notify({message:n,type:"success"}),e.initData()},function(n){e.$notify({message:n,type:"error"})})},Update:function(n){this.typeName(),this.VMovieSeriesCategoriesUpdateObj.data=n,this.updateDialog=!0,this.$store.commit("setTranstionFalse")},updateSubmit:function(){var n=this;console.log(this.VMovieSeriesCategoriesUpdateObj),this.$store.dispatch("updateVMovieSeriesCategories",this.VMovieSeriesCategoriesUpdateObj).then(function(e){n.$notify({message:e,type:"success"}),n.initData()},function(e){n.$notify({message:e,type:"error"})}),this.updateDialog=!1}}},l={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("微电影系列分类")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0,size:"small"}},[t("el-form-item",{attrs:{label:"系列名称筛选:"}},[t("el-select",{attrs:{placeholder:"请选择系列名称"},model:{value:n.seriesName,callback:function(e){n.seriesName=e},expression:"seriesName"}},n._l(n.VMovieSeries,function(n){return t("el-option",{key:n.vf_ss_ID,attrs:{label:n.vf_ss_Name,value:n.vf_ss_ID}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"分类名称筛选:"}},[t("el-select",{attrs:{placeholder:"请选择分类名称"},model:{value:n.parentTypeName,callback:function(e){n.parentTypeName=e},expression:"parentTypeName"}},n._l(n.VMovieTypeList,function(n){return t("el-option",{key:n.vf_te_ID,attrs:{label:n.vf_te_Name,value:n.vf_te_ID}})}))],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("查询")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.Add}},[n._v("新增")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.VMovieVideoSeriesCategoriesList}},[t("el-table-column",{attrs:{label:"系列分类编号",prop:"vf_st_ID"}}),n._v(" "),t("el-table-column",{attrs:{label:"系列名称",prop:"vf_ss_Name"}}),n._v(" "),t("el-table-column",{attrs:{label:"分类名称",prop:"vf_te_Name"}}),n._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){n.Update(e.row)}}},[n._v("修改\n          ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){n.Delete(e.row.vf_st_ID)}}},[n._v("删除\n          ")])]}}])})],1),n._v(" "),t("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),t("el-dialog",{attrs:{title:"添加",visible:n.addDialog},on:{"update:visible":function(e){n.addDialog=e}}},[t("el-form",{attrs:{model:n.addOptions}},[t("el-form-item",{attrs:{label:"系列名称:","label-width":n.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择系列名称"},model:{value:n.addOptions.data.vf_st_SeriesID,callback:function(e){n.$set(n.addOptions.data,"vf_st_SeriesID",e)},expression:"addOptions.data.vf_st_SeriesID"}},n._l(n.VMovieSeries,function(n){return t("el-option",{key:n.vf_ss_ID,attrs:{label:n.vf_ss_Name,value:n.vf_ss_ID}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"分类名称:","label-width":n.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择分类名称"},model:{value:n.addOptions.data.vf_st_SeriesTypeID,callback:function(e){n.$set(n.addOptions.data,"vf_st_SeriesTypeID",e)},expression:"addOptions.data.vf_st_SeriesTypeID"}},n._l(n.VMovieTypeList,function(n){return t("el-option",{key:n.vf_te_ID,attrs:{label:n.vf_te_Name,value:n.vf_te_ID}})}))],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),t("el-dialog",{attrs:{title:"修改",visible:n.updateDialog},on:{"update:visible":function(e){n.updateDialog=e}}},[t("el-form",{attrs:{model:n.VMovieSeriesCategoriesUpdateObj}},[t("el-form-item",{attrs:{label:"系列分类编号:","label-width":n.formLabelWidth}},[t("el-input",{attrs:{placeholder:"系列编号",disabled:n.isDisabled},model:{value:n.VMovieSeriesCategoriesUpdateObj.data.vf_st_ID,callback:function(e){n.$set(n.VMovieSeriesCategoriesUpdateObj.data,"vf_st_ID",e)},expression:"VMovieSeriesCategoriesUpdateObj.data.vf_st_ID"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"系列名称:","label-width":n.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择系列名称"},model:{value:n.VMovieSeriesCategoriesUpdateObj.data.vf_st_SeriesID,callback:function(e){n.$set(n.VMovieSeriesCategoriesUpdateObj.data,"vf_st_SeriesID",e)},expression:"VMovieSeriesCategoriesUpdateObj.data.vf_st_SeriesID"}},n._l(n.VMovieSeries,function(n){return t("el-option",{key:n.vf_ss_ID,attrs:{label:n.vf_ss_Name,value:n.vf_ss_ID}})}))],1),n._v(" "),t("el-form-item",{attrs:{label:"分类名称:","label-width":n.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择分类名称"},model:{value:n.VMovieSeriesCategoriesUpdateObj.data.vf_st_SeriesTypeID,callback:function(e){n.$set(n.VMovieSeriesCategoriesUpdateObj.data,"vf_st_SeriesTypeID",e)},expression:"VMovieSeriesCategoriesUpdateObj.data.vf_st_SeriesTypeID"}},n._l(n.VMovieTypeList,function(n){return t("el-option",{key:n.vf_te_ID,attrs:{label:n.vf_te_Name,value:n.vf_te_ID}})}))],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var d=t("VU/8")(r,l,!1,function(n){t("/P8k")},"data-v-94840ac4",null);e.default=d.exports},jjPs:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});