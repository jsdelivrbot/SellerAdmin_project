webpackJsonp([31],{BIG7:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("//Fk"),i=t.n(a),o=t("NYxO"),s={data:function(){return{date:"",videoData:{vedioName:""},videoName:"",filmName:"",filmID:"",isDisabled:!0,ImageURL:"",ImageURL1:[],isLoading:!1,total:0,formLabelWidth:"120px"}},computed:Object(o.b)(["VMovieMiniVideoList","VMovieVideoList"]),created:function(){this.initData(),this.initFilmName()},methods:{initFilmData:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_vo_ID:"",vf_vo_Extend:"",vf_vo_AuthorID:"",vf_vo_Type:"",vf_vo_Title:n||"",vf_vo_PasserID:""};this.$store.dispatch("initVMovieVideo",t).then(function(){for(var n=0;n<e.VMovieVideoList.length;n++){var t={};t.value=e.VMovieVideoList[n].vf_vo_ID,t.address=e.VMovieVideoList[n].vf_vo_Title}},function(n){e.$notify({message:n,type:"error"})})},loadAll:function(n){var e=this;return new i.a(function(t,a){var i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_vo_ID:"",vf_vo_Extend:"",vf_vo_AuthorID:"",vf_vo_Type:"",vf_vo_Title:n||"",vf_vo_PasserID:""};e.$store.dispatch("initVMovieVideo",i).then(function(n){t(n)},function(n){e.$notify({message:n,type:"error"})})})},searchInitData:function(){this.initFilmData(this.filmName)},querySearchAsync:function(n,e){var t=this;this.loadAll(n).then(function(n){n=(n=n.data).map(function(n){return{id:n.vf_vo_ID,value:n.vf_vo_Title}}),t.restaurants=n,clearTimeout(t.timeout),t.timeout=setTimeout(function(){e(t.restaurants)},10)})},handleSelect:function(n){this.value=n.id,this.filmName=n.value,this.filmID=n.id,this.userID=n.id,this.initFilmData(this.filmName)},search:function(){this.initData(this.filmID,this.date[0],this.date[1])},initFilmName:function(){var n=this;this.$store.dispatch("initVMovieVideo",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_vo_ID:"",vf_vo_Extend:"",vf_vo_AuthorID:"",vf_vo_Type:"",vf_vo_Title:"",vf_vo_PasserID:""}).then(function(n){},function(e){n.$notify({message:e,type:"error"})})},handleCurrentChange:function(n){this.initData("","","",n)},initData:function(n,e,t,a){var i=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_fm_ID:n||"",fromDate:e||"",toDate:t||"",page:a||1,rows:5};this.$store.dispatch("initVMovieMiniMovie",o).then(function(n){i.total=n},function(n){i.$notify({message:n,type:"error"})})},Delete:function(n){var e=this;console.log(n);var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_fm_ID:n}};this.$store.dispatch("DeleteVMovieMiniVideo",t).then(function(n){e.$notify({message:n,type:"success"}),e.initData()},function(n){e.$notify({message:n,type:"error"})})}},mounted:function(){this.searchInitData()}},r={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("微电影")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",[t("span",[n._v("视频名称筛选:")])]),n._v(" "),t("el-form-item",[t("el-autocomplete",{staticStyle:{width:"250px"},attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择视频名称"},on:{select:n.handleSelect},model:{value:n.filmName,callback:function(e){n.filmName=e},expression:"filmName"}})],1),n._v(" "),t("el-form-item",{attrs:{label:"日期筛选:"}},[t("el-date-picker",{staticStyle:{width:"400px"},attrs:{type:"daterange","range-separator":"至","value-format":"yyyy-MM-dd"},model:{value:n.date,callback:function(e){n.date=e},expression:"date"}},[n._v('\n            start-placeholder="开始日期"\n            end-placeholder="结束日期">\n          ')])],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.VMovieMiniVideoList}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[t("el-form-item",{attrs:{label:"视频编号:"}},[t("span",[n._v(n._s(e.row.vf_vo_ID))])]),n._v(" "),t("el-form-item",{attrs:{label:"时长:"}},[t("span",[n._v(n._s(e.row.vf_vo_Time)+"秒")])]),n._v(" "),t("el-form-item",{attrs:{label:"大小:"}},[t("span",[n._v(n._s(e.row.vf_vo_Size))])]),n._v(" "),t("el-form-item",{attrs:{label:"文件扩展名:"}},[t("span",[n._v(n._s(e.row.vf_vo_Extend))])]),n._v(" "),t("el-form-item",{attrs:{label:"视频:"}},[t("video",{attrs:{id:"addVideo",src:e.row.vf_vo_TempFileURL,width:"320",height:"240",controls:"controls"}})]),n._v(" "),t("el-form-item",{attrs:{label:"作者:"}},[t("span",[n._v(n._s(e.row.vf_vo_AuthorID))])]),n._v(" "),t("el-form-item",{attrs:{label:"视频类型:"}},[t("span",[n._v(n._s(e.row.vf_vo_Type))])]),n._v(" "),t("el-form-item",{attrs:{label:"标题:"}},[t("span",[n._v(n._s(e.row.vf_vo_Title))])]),n._v(" "),t("el-form-item",{attrs:{label:"视频图片:"}},[t("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.row.vf_vo_ImageURL,alt:""}})]),n._v(" "),t("el-form-item",{attrs:{label:"创建时间:"}},[t("span",[n._v(n._s(e.row.vf_vo_CreateTime))])]),n._v(" "),t("el-form-item",{attrs:{label:"审核人编码:"}},[t("span",[n._v(n._s(e.row.f_vo_PasserID))])]),n._v(" "),t("el-form-item",{attrs:{label:"审核时间:"}},[t("span",[n._v(n._s(e.row.vf_vo_ValidateTime))])]),n._v(" "),t("el-form-item",{attrs:{label:"简介:"}},[t("span",[n._v(n._s(e.row.vf_vo_Introduce))])]),n._v(" "),t("el-form-item",{attrs:{label:"详情:"}},[t("span",[n._v(n._s(e.row.vf_vo_Remark))])]),n._v(" "),t("el-form-item",{attrs:{label:"类型名称:"}},[t("span",[n._v(n._s(e.row.vf_vo_TypeName))])])],1)]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"视频编号",prop:"vf_vo_ID"}}),n._v(" "),t("el-table-column",{attrs:{label:"标题",prop:"vf_vo_Title"}}),n._v(" "),t("el-table-column",{attrs:{label:"视频类型名称",prop:"vf_vo_TypeName"}}),n._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){n.Delete(e.row.vf_vo_ID)}}},[n._v("删除\n          ")])]}}])})],1),n._v(" "),t("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var l=t("VU/8")(s,r,!1,function(n){t("KDU4")},"data-v-3cb54122",null);e.default=l.exports},KDU4:function(n,e,t){var a=t("oUrA");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("0c78f1fb",a,!0)},oUrA:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});