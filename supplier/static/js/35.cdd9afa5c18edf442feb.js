webpackJsonp([35],{"5VNs":function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},Ahng:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("//Fk"),i=t.n(a),o=t("bOdI"),s=t.n(o),r=t("SJI6"),l=t("jvWE"),u={data:function(){var n;return n={restaurants:[],tylist:[],filmName:"",inputFilmName:"",typeName:"",choiceFilmName:[]},s()(n,"inputFilmName",""),s()(n,"isDisabled",!0),s()(n,"updateDialog",!1),s()(n,"ImageURL",""),s()(n,"ImageURL1",[]),s()(n,"isLoading",!1),s()(n,"total",0),s()(n,"movieType",""),s()(n,"formLabelWidth","120px"),s()(n,"loadAllFilmTypeList",[{value:"(小杨生煎)西郊百联餐厅",address:"长宁区仙霞西路88号百联2楼"},{value:"阳阳麻辣烫",address:"天山西路389号"},{value:"南拳妈妈龙虾盖浇饭",address:"普陀区金沙江路1699号鑫乐惠美食广场A13"}]),n},computed:Object(r.mapGetters)(["VMovieVideoCategoriesList","VMovieParentTypeList","VMovieVideoList","adminProductLineManagementId"]),created:function(){this.initData(),this.initTypeData()},methods:{searchInitData:function(){this.initFilmData(this.filmName)},handleSelect:function(n){this.value=n.id,this.filmName=n.value,this.inputFilmName=n.id,this.userID=n.id,this.initFilmData(this.filmName)},loadAll:function(n){var e=this;return new i.a(function(t,a){var i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_vo_ID:"",vf_vo_Extend:"",vf_vo_AuthorID:"",vf_vo_Type:"",vf_vo_Title:n||"",vf_vo_PasserID:""};e.$store.dispatch("initVMovieVideo",i).then(function(n){t(n)},function(n){e.$notify({message:n,type:"error"})})})},createStateFilter:function(n){return function(e){return 0===e.value.toLowerCase().indexOf(n.toLowerCase())}},querySearchAsync:function(n,e){var t=this;this.loadAll(n).then(function(n){n=(n=n.data).map(function(n){return{id:n.vf_vo_ID,value:n.vf_vo_Title}}),t.restaurants=n,clearTimeout(t.timeout),t.timeout=setTimeout(function(){e(t.restaurants)},10)})},createFilter:function(n){return function(e){return 0===e.value.toLowerCase().indexOf(n.toLowerCase())}},handleCurrentChange:function(n){this.initData(this.typeId,n)},initData:function(n,e,t){var a=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",pcName:"",vf_vt_ID:"",vf_vt_TypeID:n||"",vf_vt_VedioID:e||"",page:t||2,rows:5};this.$store.dispatch("initVMovieVideoCategories",i).then(function(n){a.total=n},function(n){a.$notify({message:n,type:"error"})})},initTypeData:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_te_ID:"",vf_te_Name:"",vf_te_ParentIDs:n||"2,4"};this.$store.dispatch("initVMovieParentSorting",t).then(function(n){e.total=n},function(n){e.$notify({message:n,type:"error"})})},initFilmData:function(n){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_vo_ID:"",vf_vo_Extend:"",vf_vo_AuthorID:"",vf_vo_Type:"",vf_vo_Title:n||"",vf_vo_PasserID:""};this.$store.dispatch("initVMovieVideo",t).then(function(){for(var n=0;n<e.VMovieVideoList.length;n++){var t={};t.value=e.VMovieVideoList[n].vf_vo_ID,t.address=e.VMovieVideoList[n].vf_vo_Title,e.loadAllFilmTypeList.push(t)}},function(n){e.$notify({message:n,type:"error"})})},search:function(){this.initData(this.typeName.join(","),this.inputFilmName,1)},uploadImg:function(n){return new i.a(function(e,t){lrz(n).then(function(n){e(n.base64.split(",")[1])})})},uploadToOSS:function(n){return new i.a(function(e,t){var a=new FormData;a.append("fileToUpload",n);var i=new XMLHttpRequest;i.open("POST",l.b+"/OSSFile/PostToOSS"),i.send(a),i.onreadystatechange=function(){if(4==i.readyState&&200==i.status){if(i.responseText){var n=i.responseText;e(JSON.parse(n))}}else console.log(i.responseText)}})},uploaNode:function(){var n=this;this.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",this.ImageURL1=[],setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(e){for(var t=0;t<n.$refs.upload.files.length;t++)n.uploadToOSS(n.$refs.upload.files[t]).then(function(e){n.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",e?n.addOptions.data.vf_ve_Content.vf_vo_ImageURL=e.data:n.$notify({message:"图片地址不存在!",type:"error"})})}),n.$refs.upload1&&n.$refs.upload1.addEventListener("change",function(e){for(var t=0;t<n.$refs.upload1.files.length;t++)n.uploadToOSS(n.$refs.upload1.files[t]).then(function(e){e?n.ImageURL1.push(e.data):n.$notify({message:"图片地址不存在!",type:"error"})})})},30)}},mounted:function(){this.searchInitData()}},v={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("视频分类")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0,size:"small"}},[t("el-form-item",[t("span",[n._v("请选择分类名称:")]),n._v(" "),t("el-select",{attrs:{multiple:"",placeholder:"请选择分类"},model:{value:n.typeName,callback:function(e){n.typeName=e},expression:"typeName"}},n._l(n.VMovieParentTypeList,function(n){return t("el-option",{key:n.vf_te_ID,attrs:{label:n.vf_te_Name,value:n.vf_te_ID}})}))],1),n._v(" "),t("el-form-item",[t("span",[n._v("视频名称筛选:")])]),n._v(" "),t("el-form-item",[t("el-autocomplete",{staticStyle:{width:"250px"},attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择视频名称"},on:{select:n.handleSelect},model:{value:n.filmName,callback:function(e){n.filmName=e},expression:"filmName"}})],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.VMovieVideoCategoriesList}},[t("el-table-column",{attrs:{label:"视频分类编号",prop:"vf_vt_ID"}}),n._v(" "),t("el-table-column",{attrs:{label:"分类名称",prop:"vf_te_Name"}}),n._v(" "),t("el-table-column",{attrs:{label:"标题",prop:"vf_vo_Title"}})],1),n._v(" "),t("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var f=t("VU/8")(u,v,!1,function(n){t("c2Eg")},"data-v-2d402123",null);e.default=f.exports},c2Eg:function(n,e,t){var a=t("5VNs");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("7fcc57e2",a,!0)}});