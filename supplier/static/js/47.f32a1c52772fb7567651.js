webpackJsonp([47],{"1blQ":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("//Fk"),i=t.n(a),s=t("NYxO"),o={data:function(){return{num:"",isDisabled:!0,updateDialog:!1,ImageURL:"",ImageURL1:[],isLoading:!1,total:0,movieType:"",addDialog:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_fs_SeriesID:"1",vf_fs_VedioID:"1",vf_fs_Level:"1"}},formLabelWidth:"120px",VMovieVideoSeriesUpdateObj:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_fs_ID:"10",vf_fs_SeriesID:"1",vf_fs_VedioID:"2",vf_fs_Level:"8"}}}},computed:Object(s.b)(["VMovieVideoSeries","VMovieSeries","VMovieVideoList"]),created:function(){this.initData("","",1)},methods:{film:function(){this.$store.dispatch("initVMovieVideo",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_vo_ID:"",vf_vo_Extend:"",vf_vo_AuthorID:"",vf_vo_Type:"",vf_vo_Title:"",vf_vo_PasserID:""})},handleCurrentChange:function(e){this.initData("","",e),this.num=e},initData:function(e,n,t){var a=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_fs_ID:"",vf_fs_SeriesID:e||"",vf_fs_VedioID:n||"",page:t||1,rows:5};this.$store.dispatch("initVMovieVideoSeries",i).then(function(e){a.total=e},function(e){a.$notify({message:e,type:"error"})})},search:function(){this.initData(this.movieType)},searchSeries:function(){var e=this;this.$store.dispatch("initVMovieSeries",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_ss_ID:"",vf_ss_Name:"",vf_ss_WriteState:"",vf_ss_AuthorID:""}).then(function(n){e.total=n},function(n){e.$notify({message:n,type:"error"})})},Add:function(){for(var e in this.film(),this.searchSeries(),this.addOptions.data)this.addOptions.data[e]="";this.addDialog=!0,this.$store.commit("setTranstionFalse")},addSubmit:function(){var e=this;this.$store.dispatch("addVMovieVideoSeries",this.addOptions).then(function(n){e.$notify({message:n,type:"success"}),e.initData("","",1)},function(n){e.$notify({message:n,type:"error"})}),this.addDialog=!1},uploadImg:function(e){return new i.a(function(n,t){lrz(e).then(function(e){n(e.base64.split(",")[1])})})},uploaNode:function(){var e=this;this.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",this.ImageURL1=[],setTimeout(function(){e.$refs.upload&&e.$refs.upload.addEventListener("change",function(n){for(var t=0;t<e.$refs.upload.files.length;t++)e.uploadImg(e.$refs.upload.files[t]).then(function(n){e.$store.dispatch("VMovieCheckTableUploadnImgs",{imageData:n}).then(function(n){e.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",n?e.addOptions.data.vf_ve_Content.vf_vo_ImageURL=n.data:e.$notify({message:"图片地址不存在!",type:"error"})})})}),e.$refs.upload1&&e.$refs.upload1.addEventListener("change",function(n){for(var t=0;t<e.$refs.upload1.files.length;t++)e.uploadImg(e.$refs.upload1.files[t]).then(function(n){e.$store.dispatch("VMovieCheckTableUploadnImgs",{imageData:n}).then(function(n){n?e.ImageURL1.push(n.data):e.$notify({message:"图片地址不存在!",type:"error"})})})})},30)},Delete:function(e){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_fs_ID:e}};this.$store.dispatch("DeleteVMovieVideoSeries",t).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.movieType)},function(e){n.$notify({message:e,type:"error"})})},Update:function(e){this.searchSeries(),this.film(),this.updateDialog=!0,this.$store.commit("setTranstionFalse"),this.VMovieVideoSeriesUpdateObj.data.vf_fs_ID=e.vf_fs_ID,this.VMovieVideoSeriesUpdateObj.data.vf_fs_SeriesID=e.vf_fs_SeriesID,this.VMovieVideoSeriesUpdateObj.data.vf_fs_VedioID=e.vf_fs_VedioID,this.VMovieVideoSeriesUpdateObj.data.vf_fs_Level=e.vf_fs_Level},updateSubmit:function(){var e=this;this.$store.dispatch("updateVMovieVideoSeries",this.VMovieVideoSeriesUpdateObj).then(function(n){e.$notify({message:n,type:"success"}),initData(e.movieType,"",e.num)},function(n){e.$notify({message:n,type:"error"})}),this.updateDialog=!1}}},l={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[e._v("视频系列")]),e._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0,size:"small"}},[t("el-form-item",{attrs:{label:"电影类型筛选:"}},[t("el-select",{attrs:{placeholder:"请选择电影类型"},model:{value:e.movieType,callback:function(n){e.movieType=n},expression:"movieType"}},[t("el-option",{attrs:{label:"微电影",value:"0"}}),e._v(" "),t("el-option",{attrs:{label:"广告视频",value:"1"}}),e._v(" "),t("el-option",{attrs:{label:"教育视频",value:"2"}})],1)],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.Add}},[e._v("新增")])],1)],1)],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:e.VMovieVideoSeries}},[t("el-table-column",{attrs:{label:"视频系列编码",prop:"vf_fs_ID"}}),e._v(" "),t("el-table-column",{attrs:{label:"系列名称",prop:"vf_ss_Name"}}),e._v(" "),t("el-table-column",{attrs:{label:"视频名称",prop:"vf_vo_Title"}}),e._v(" "),t("el-table-column",{attrs:{label:"第几集",prop:"vf_fs_Level"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.Update(n.row)}}},[e._v("修改\n          ")]),e._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){e.Delete(n.row.vf_fs_ID)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),t("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),t("el-dialog",{attrs:{title:"添加",visible:e.addDialog},on:{"update:visible":function(n){e.addDialog=n}}},[t("el-form",{attrs:{model:e.addOptions}},[t("el-form-item",{attrs:{label:"系列名称:","label-width":e.formLabelWidth}},[t("el-select",{staticStyle:{width:"400px"},attrs:{placeholder:"请选择系列名称"},model:{value:e.addOptions.data.vf_fs_SeriesID,callback:function(n){e.$set(e.addOptions.data,"vf_fs_SeriesID",n)},expression:"addOptions.data.vf_fs_SeriesID"}},e._l(e.VMovieSeries,function(e){return t("el-option",{key:e.vf_ss_ID,attrs:{label:e.vf_ss_Name,value:e.vf_ss_ID}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"视频名称:","label-width":e.formLabelWidth}},[t("el-select",{staticStyle:{width:"400px"},attrs:{placeholder:"请选择视频名称"},model:{value:e.addOptions.data.vf_fs_VedioID,callback:function(n){e.$set(e.addOptions.data,"vf_fs_VedioID",n)},expression:"addOptions.data.vf_fs_VedioID"}},e._l(e.VMovieVideoList,function(e){return t("el-option",{key:e.vf_vo_ID,attrs:{label:e.vf_vo_Title,value:e.vf_vo_ID}})}))],1),e._v(" "),t("el-form-item",{staticStyle:{width:"300px"},attrs:{label:"第几集:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"第几集(只能输数字)"},model:{value:e.addOptions.data.vf_fs_Level,callback:function(n){e.$set(e.addOptions.data,"vf_fs_Level",n)},expression:"addOptions.data.vf_fs_Level"}})],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.addSubmit}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"修改",visible:e.updateDialog},on:{"update:visible":function(n){e.updateDialog=n}}},[t("el-form",{attrs:{model:e.VMovieVideoSeriesUpdateObj}},[t("el-form-item",{attrs:{label:"视频系列编码:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"视频系列编码",disabled:e.isDisabled},model:{value:e.VMovieVideoSeriesUpdateObj.data.vf_vt_ID,callback:function(n){e.$set(e.VMovieVideoSeriesUpdateObj.data,"vf_vt_ID",n)},expression:"VMovieVideoSeriesUpdateObj.data.vf_vt_ID"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"系列名称:","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择系列名称"},model:{value:e.VMovieVideoSeriesUpdateObj.data.vf_fs_SeriesID,callback:function(n){e.$set(e.VMovieVideoSeriesUpdateObj.data,"vf_fs_SeriesID",n)},expression:"VMovieVideoSeriesUpdateObj.data.vf_fs_SeriesID"}},e._l(e.VMovieSeries,function(e){return t("el-option",{key:e.vf_ss_ID,attrs:{label:e.vf_ss_Name,value:e.vf_ss_ID}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"视频标题:","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择视频标题"},model:{value:e.VMovieVideoSeriesUpdateObj.data.vf_fs_VedioID,callback:function(n){e.$set(e.VMovieVideoSeriesUpdateObj.data,"vf_fs_VedioID",n)},expression:"VMovieVideoSeriesUpdateObj.data.vf_fs_VedioID"}},e._l(e.VMovieVideoList,function(e){return t("el-option",{key:e.vf_vo_ID,attrs:{label:e.vf_vo_Title,value:e.vf_vo_ID}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"第几集:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"第几集"},model:{value:e.VMovieVideoSeriesUpdateObj.data.vf_fs_Level,callback:function(n){e.$set(e.VMovieVideoSeriesUpdateObj.data,"vf_fs_Level",n)},expression:"VMovieVideoSeriesUpdateObj.data.vf_fs_Level"}})],1)],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.updateSubmit}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var r=t("VU/8")(o,l,!1,function(e){t("j+OT")},"data-v-22e25da4",null);n.default=r.exports},"Vkw/":function(e,n,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"j+OT":function(e,n,t){var a=t("Vkw/");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("5638951a",a,!0)}});