webpackJsonp([43],{"6gX+":function(e,n,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},Bp4o:function(e,n,t){var a=t("6gX+");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("e1352fc6",a,!0)},ZyR9:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("//Fk"),s=t.n(a),i=t("NYxO"),l={data:function(){return{num:"",SerialState:[{label:"连载中",value:0},{label:"已完结",value:1}],Author:"",SeriesName:"",WriteState:"",isDisabled:!0,updateDialog:!1,ImageURL:"",ImageURL1:[],isLoading:!1,total:0,movieType:"",addDialog:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_ss_Name:"电影自习室",vf_ss_WriteState:"0",vf_ss_SeriesImageURL:"1",vf_ss_AuthorID:"23",vf_ss_UpdateTime:"每周二、四更新"}},formLabelWidth:"120px",VMovieSeriesUpdateObj:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_ss_ID:"",vf_ss_Name:"",vf_ss_WriteState:"",vf_ss_SeriesImageURL:"",vf_ss_AuthorID:"",vf_ss_UpdateTime:""}}}},computed:Object(i.b)(["VMovieSeries"]),created:function(){this.initData()},methods:{handleCurrentChange:function(e){this.initData("","","",e),this.num=e},initData:function(e,n,t,a){var s=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_ss_ID:"",vf_ss_Name:e||"",vf_ss_WriteState:n||"",vf_ss_AuthorID:t||"",page:a||1,rows:5};this.$store.dispatch("initVMovieSeries",i).then(function(e){s.total=e},function(e){s.$notify({message:e,type:"error"})})},search:function(){this.initData(this.SeriesName,this.WriteState,this.Author,1)},Add:function(){var e=this.addOptions.data;for(var n in e)e[n]="";this.addDialog=!0,this.$store.commit("setTranstionFalse"),this.uploaNode()},addSubmit:function(){var e=this;this.addOptions.data.vf_ss_AuthorID=22,this.$store.dispatch("addVMovieSeries",this.addOptions).then(function(n){e.$notify({message:n,type:"success"}),e.initData(e.SeriesName,e.WriteState,e.Author,1)},function(n){e.$notify({message:n,type:"error"})}),this.addDialog=!1},uploadImg:function(e){return new s.a(function(n,t){lrz(e).then(function(e){n(e.base64.split(",")[1])})})},uploaNode:function(){var e=this;this.addOptions.data.vf_ss_SeriesImageURL="",this.ImageURL1=[],setTimeout(function(){e.$refs.upload&&e.$refs.upload.addEventListener("change",function(n){for(var t=0;t<e.$refs.upload.files.length;t++)e.uploadImg(e.$refs.upload.files[t]).then(function(n){e.$store.dispatch("UploadnImgs",{imageData:n}).then(function(n){e.addOptions.data.vf_ss_SeriesImageURL="",n?e.addOptions.data.vf_ss_SeriesImageURL=n.data:e.$notify({message:"图片地址不存在!",type:"error"})})})}),e.$refs.upload1&&e.$refs.upload1.addEventListener("change",function(n){for(var t=0;t<e.$refs.upload1.files.length;t++)e.uploadImg(e.$refs.upload1.files[t]).then(function(n){e.$store.dispatch("UploadnImgs",{imageData:n}).then(function(n){n?e.VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL=n.data:e.$notify({message:"图片地址不存在!",type:"error"})})})})},30)},Delete:function(e){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_ss_ID:e}};this.$store.dispatch("DeleteVMovieSeries",t).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.SeriesName,n.WriteState,n.Author,1)},function(e){n.$notify({message:e,type:"error"})})},Update:function(e){this.ImageURL1=[],this.uploaNode(),this.updateDialog=!0,this.$store.commit("setTranstionFalse"),this.VMovieSeriesUpdateObj.data=e,this.VMovieSeriesUpdateObj.data.vf_ss_AuthorID=22},updateSubmit:function(){var e=this;this.$store.dispatch("updateVMovieSeries",this.VMovieSeriesUpdateObj).then(function(n){e.$notify({message:n,type:"success"}),e.initData(e.movieType,"","",e.num)},function(n){e.$notify({message:n,type:"error"})}),this.updateDialog=!1}}},o={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[e._v("系列")]),e._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0,size:"small"}},[t("el-form-item",{attrs:{label:"系列名称:"}},[t("el-input",{attrs:{placeholder:"系列名称"},model:{value:e.SeriesName,callback:function(n){e.SeriesName=n},expression:"SeriesName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"连载状态:"}},[t("el-select",{attrs:{placeholder:"连载状态"},model:{value:e.WriteState,callback:function(n){e.WriteState=n},expression:"WriteState"}},[t("el-option",{attrs:{label:"连载中",value:"0"}}),e._v(" "),t("el-option",{attrs:{label:"已完结",value:"1"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"作者:"}},[t("el-input",{attrs:{placeholder:"作者"},model:{value:e.Author,callback:function(n){e.Author=n},expression:"Author"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.Add}},[e._v("新增")])],1)],1)],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:e.VMovieSeries}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[t("el-form-item",{attrs:{label:"系列编号:"}},[t("span",[e._v(e._s(n.row.vf_ss_ID))])]),e._v(" "),t("el-form-item",{attrs:{label:"作者:"}},[t("span",[e._v(e._s(n.row.vf_ss_AuthorID))])]),e._v(" "),t("el-form-item",{attrs:{label:"创建时间:"}},[t("span",[e._v(e._s(n.row.vf_ss_CreateTime))])]),e._v(" "),t("el-form-item",{attrs:{label:"系列名称:"}},[t("span",[e._v(e._s(n.row.vf_ss_Name))])]),e._v(" "),t("el-form-item",{attrs:{label:"描述:"}},[t("span",[e._v(e._s(n.row.vf_ss_Describ))])]),e._v(" "),t("el-form-item",{attrs:{label:"完载时间:"}},[t("span",[e._v(e._s(n.row.vf_ss_OverTime))])]),e._v(" "),t("el-form-item",{attrs:{label:"系列图片:"}},[t("img",{staticStyle:{width:"100px",height:"50px"},attrs:{src:n.row.vf_ss_SeriesImageURL,alt:""}})]),e._v(" "),t("el-form-item",{attrs:{label:"更新时间:"}},[t("span",[e._v(e._s(n.row.vf_ss_UpdateTime))])]),e._v(" "),t("el-form-item",{attrs:{label:"连载状态:"}},[t("span",[e._v(e._s(e._f("getSeriesState")(n.row.vf_ss_WriteState)))])])],1)]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"系列编号",prop:"vf_ss_ID"}}),e._v(" "),t("el-table-column",{attrs:{label:"作者",prop:"vf_ss_AuthorID"}}),e._v(" "),t("el-table-column",{attrs:{label:"系列名称",prop:"vf_ss_Name"}}),e._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.Update(n.row)}}},[e._v("修改\n          ")]),e._v(" "),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){e.Delete(n.row.vf_ss_ID)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),t("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),t("el-dialog",{attrs:{title:"添加",visible:e.addDialog},on:{"update:visible":function(n){e.addDialog=n}}},[t("el-form",{attrs:{model:e.addOptions}},[t("el-form-item",{attrs:{label:"系列名称:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"系列名称"},model:{value:e.addOptions.data.vf_ss_Name,callback:function(n){e.$set(e.addOptions.data,"vf_ss_Name",n)},expression:"addOptions.data.vf_ss_Name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"描述:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"描述"},model:{value:e.addOptions.data.vf_ss_Describ,callback:function(n){e.$set(e.addOptions.data,"vf_ss_Describ",n)},expression:"addOptions.data.vf_ss_Describ"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"连载状态:","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择连载状态"},model:{value:e.addOptions.data.vf_ss_WriteState,callback:function(n){e.$set(e.addOptions.data,"vf_ss_WriteState",n)},expression:"addOptions.data.vf_ss_WriteState"}},[t("el-option",{attrs:{label:"连载中",value:"0"}}),e._v(" "),t("el-option",{attrs:{label:"完结",value:"1"}})],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"更新时间:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"更新时间"},model:{value:e.addOptions.data.vf_ss_UpdateTime,callback:function(n){e.$set(e.addOptions.data,"vf_ss_UpdateTime",n)},expression:"addOptions.data.vf_ss_UpdateTime"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"系列图片:","label-width":e.formLabelWidth}},[t("a",{staticClass:"file",attrs:{href:"javascript:;"}},[e._v("\n            系列图片上传\n            "),t("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),e._v(" "),t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.addOptions.data.vf_ss_SeriesImageURL,expression:"addOptions.data.vf_ss_SeriesImageURL"},{name:"show",rawName:"v-show",value:e.addOptions.data.vf_ss_SeriesImageURL,expression:"addOptions.data.vf_ss_SeriesImageURL"}],staticStyle:{width:"100px",height:"100px"}})])],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.addSubmit}},[e._v("确 定")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"修改",visible:e.updateDialog},on:{"update:visible":function(n){e.updateDialog=n}}},[t("el-form",{attrs:{model:e.VMovieSeriesUpdateObj}},[t("el-form-item",{attrs:{label:"系列编号:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"时长",disabled:e.isDisabled},model:{value:e.VMovieSeriesUpdateObj.data.vf_ss_ID,callback:function(n){e.$set(e.VMovieSeriesUpdateObj.data,"vf_ss_ID",n)},expression:"VMovieSeriesUpdateObj.data.vf_ss_ID"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"系列名称:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"时长"},model:{value:e.VMovieSeriesUpdateObj.data.vf_ss_Name,callback:function(n){e.$set(e.VMovieSeriesUpdateObj.data,"vf_ss_Name",n)},expression:"VMovieSeriesUpdateObj.data.vf_ss_Name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"描述:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"描述"},model:{value:e.VMovieSeriesUpdateObj.data.vf_ss_Describ,callback:function(n){e.$set(e.VMovieSeriesUpdateObj.data,"vf_ss_Describ",n)},expression:"VMovieSeriesUpdateObj.data.vf_ss_Describ"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"连载状态:","label-width":e.formLabelWidth}},[t("el-select",{attrs:{placeholder:"请选择连载状态"},model:{value:e.VMovieSeriesUpdateObj.data.vf_ss_WriteState,callback:function(n){e.$set(e.VMovieSeriesUpdateObj.data,"vf_ss_WriteState",n)},expression:"VMovieSeriesUpdateObj.data.vf_ss_WriteState"}},e._l(e.SerialState,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"更新时间:","label-width":e.formLabelWidth}},[t("el-input",{attrs:{placeholder:"更新时间"},model:{value:e.VMovieSeriesUpdateObj.data.vf_ss_UpdateTime,callback:function(n){e.$set(e.VMovieSeriesUpdateObj.data,"vf_ss_UpdateTime",n)},expression:"VMovieSeriesUpdateObj.data.vf_ss_UpdateTime"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"系列图片:","label-width":e.formLabelWidth}},[t("a",{staticClass:"file",attrs:{href:"javascript:;"}},[e._v("\n            系列图片上传\n            "),t("input",{ref:"upload1",attrs:{type:"file",name:"",accept:"image/*"}})]),e._v(" "),t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL,expression:"VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL"},{name:"show",rawName:"v-show",value:e.VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL,expression:"VMovieSeriesUpdateObj.data.vf_ss_SeriesImageURL"}],staticStyle:{width:"100px",height:"100px"}})])],1),e._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.updateSubmit}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var r=t("VU/8")(l,o,!1,function(e){t("Bp4o")},"data-v-43df795f",null);n.default=r.exports}});