webpackJsonp([33],{"5njY":function(e,t,a){var i=a("obBV");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("6imX")("d054173a",i,!0)},Wvdb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("GxZn"),o=a.n(i),n=a("SJI6"),s=(a("jvWE"),{name:"",components:{Upload:a("TAej").a},data:function(){return{isUploaNode:!0,categoriesName:[],value11:[],updateChildType:[],updateCategoriesName:[],updateFilmType:[],value5:"",typeID:"",parentTypeId:"",addVideoSrc:"",num:"",Imgs:"",radioIndex:"",radioIndexOne:"",updateMovieType:"",typeId:"",isVisible:!1,percentage:0,videoData:{vedioName:""},videoObj:{accept:"video/*"},imageObj:{accept:"image/*"},isNewUploaNode:!0,isNewUploaNodeOne:!0,isNewUploaUpdateNode:!0,isNewUploaUpdateNodeOne:!0,isDisabled:!0,updateDialog:!1,ImageURL:[],ImageURLOne:[],ImageUpdateURL:[],ImageUpdateURLOne:[],isLoading:!1,total:0,movieType:"",updateFilmfile:[],radioUpdateIndexOne:0,radioUpdateIndex:0,addDialog:!1,addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_ve_Type:"2",vf_ve_Content:{vf_vo_ID:"",vf_vo_Time:"",vf_vo_Size:"",vf_vo_Extend:"mp4",vf_vo_FileURL:"",vf_vo_AuthorID:JSON.parse(sessionStorage.getItem("admin")).sm_ui_ID+"",vf_vo_Title:"",vf_vo_ImageURL:"",vf_vo_TomImageURL:"",vf_vo_CreateTime:"",vf_vo_Introduce:"",vf_vo_Remark:"",vf_te_IDs:""}}},formLabelWidth:"120px",VMovieCheckTableUpdateObj:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_ve_ID:"",vf_ve_Type:"2",vf_ve_Content:{vf_vo_ID:"",vf_vo_Time:"",vf_vo_Size:"",vf_vo_Extend:"",vf_vo_FileURL:"",vf_vo_AuthorID:JSON.parse(sessionStorage.getItem("admin")).sm_ui_ID+"",vf_vo_Title:"",vf_vo_ImageURL:"",vf_vo_TomImageURL:"",vf_vo_CreateTime:"",vf_vo_Introduce:"",vf_vo_Remark:"",vf_te_IDs:""}}}}},computed:Object(n.mapGetters)(["VMovieCheckTableList","VMovieParentTypeList","UploadVideoList","VMovieTypeList","VMovieChildTyeList"]),created:function(){this.initData()},methods:{passVideo:function(e){this.addOptions.data.vf_ve_Content.vf_vo_FileURL=e.data},getData:function(e){this.radioIndex?(this.ImageURL.splice(this.radioIndex-1,1,e.data),this.radioIndex=""):this.ImageURL.push(e.data)},getDataOne:function(e){this.radioIndexOne?(this.ImageURLOne.splice(this.radioIndexOne-1,1,e.data),this.radioIndexOne=""):this.ImageURLOne.push(e.data)},getUpdateData:function(e){this.radioUpdateIndex?(this.ImageUpdateURL.splice(this.radioUpdateIndex-1,1,e.data),this.radioUpdateIndex=""):this.ImageUpdateURL.push(e.data)},getUpdateDataOne:function(e){this.radioUpdateIndexOne?(this.ImageUpdateURLOne.splice(this.radioUpdateIndexOne-1,1,e.data),this.radioUpdateIndexOne=""):this.ImageUpdateURLOne.push(e.data)},updateVideo:function(e){this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_FileURL=e.data},deleteImageURL:function(e){this.isNewUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(t){return t!=e})},deleteImageURLOne:function(e){this.isNewUploaNodeOne=!1,this.ImageURLOne=this.ImageURLOne.filter(function(t){return t!=e})},deleteUpdateImageURLOne:function(e){this.isNewUploaUpdateNode=!1,this.ImageUpdateURL=this.ImageUpdateURL.filter(function(t){return t!=e})},deleteUpdateImageURLTwo:function(e){this.isNewUploaUpdateNodeOne=!1,this.ImageUpdateURLOne=this.ImageUpdateURLOne.filter(function(t){return t!=e})},closeDialog:function(){this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL="",this.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",this.addDialog=!1,this.updateDialog=!1},cacheForm:function(){this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL="",this.addOptions.data.vf_ve_Content.vf_vo_ImageURL="",this.addDialog=!1,this.updateDialog=!1},updateParentChange:function(){this.VMovieCheckTableUpdateObj.data.vf_ve_Type=this.updateFilmType.join(","),this.childTypeData(this.updateFilmType.join(","))},addParentChange:function(){this.childTypeData(this.parentTypeId.join(",")),this.isVisible=!0,"5"!=this.parentTypeId&&""!=this.parentTypeId||(this.isVisible=!1)},childTypeData:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_te_ID:"",vf_te_Name:"",vf_te_ParentIDs:e||"0"};this.$store.dispatch("childTypeData",a).then(function(e){t.total=e},function(e){t.$notify({message:e,type:"error"})})},childTypeData2:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_te_ID:"",vf_te_Name:"",vf_te_ParentIDs:e||"0"};this.$store.dispatch("childTypeData2",a).then(function(e){t.total=e},function(e){t.$notify({message:e,type:"error"})})},handleCurrentChange:function(e){this.initData("",e),this.num=e},intTypeData:function(e,t){var a=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_te_ID:e||"",vf_te_Name:"",vf_te_ParentIDs:t||"0"};this.$store.dispatch("initVMovieSorting",i).then(function(e){a.total=e},function(e){a.$notify({message:e,type:"error"})})},initData:function(e,t){var a=this,i={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",vf_ve_ID:"",vf_vo_AuthorID:JSON.parse(sessionStorage.getItem("admin")).sm_ui_ID+"",vf_ve_Type:e||"2",page:t||1,rows:5};this.$store.dispatch("initVMovieCheckTable",i).then(function(e){a.total=e},function(e){a.$notify({message:e,type:"error"})})},search:function(){this.initData(this.movieType)},Add:function(){var e=document.querySelector(".uploader-list");for(var t in e&&(e.querySelector("ul").innerHTML=""),this.addOptions.data)if("object"==o()(this.addOptions.data[t]))for(var a in this.addOptions.data[t])this.addOptions.data[t][a]="";else this.addOptions.data[t]="";this.ImageURL=[],this.ImageURLOne=[],this.intTypeData();var i=this.addOptions.data.vf_ve_Content;for(var n in i)i[n]="";this.addDialog=!0,this.$store.commit("setTranstionFalse")},addSubmit:function(){var e=this;this.addOptions.data.vf_ve_Content.vf_vo_TomImageURL=this.ImageURL.join(","),this.addOptions.data.vf_ve_Content.vf_vo_ImageURL=this.ImageURLOne.join(",");(new Date).getDay();Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var a in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[a]:("00"+t[a]).substr((""+t[a]).length)));return e},this.addOptions.data.vf_ve_Content.vf_vo_CreateTime=(new Date).Format("yyyy/MM/dd hh:mm:ss"),this.addOptions.data.vf_ve_Content.vf_te_IDs=this.categoriesName.join(","),this.addOptions.data.vf_ve_Content.vf_vo_AuthorID=JSON.parse(sessionStorage.getItem("admin")).sm_ui_ID+"",this.$store.dispatch("addVMovieCheckTable",this.addOptions).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})}),this.initData(),this.addDialog=!1},Delete:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{vf_ve_ID:e}};this.$store.dispatch("DeleteVMovieCheckTable",a).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.movieType,t.num)},function(e){t.$notify({message:e,type:"error"})})},Update:function(e){this.updateDialog=!0,this.VMovieCheckTableUpdateObj.data=e,this.updateFilmType=[],this.intTypeData();var t=e.vf_ve_Type.split(",");for(var a in t)this.updateFilmType.push(Number(t[a]));this.updateCategoriesName=[],this.childTypeData(e.vf_ve_Type);var i=e.vf_ve_Content.vf_te_IDs.split(",");for(var o in i)this.updateCategoriesName.push(Number(i[o]));this.ImageUpdateURL=e.vf_ve_Content.vf_vo_TomImageURL.split(","),this.ImageUpdateURLOne=e.vf_ve_Content.vf_vo_ImageURL.split(","),this.$store.commit("setTranstionFalse")},updateSubmit:function(){var e=this;this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL="",this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ImageURL="",this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_TomImageURL=this.ImageUpdateURL.join(","),this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_ImageURL=this.ImageUpdateURLOne.join(","),this.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_te_ID=this.updateCategoriesName.join(","),this.$store.dispatch("updateVMovieCheckTable",this.VMovieCheckTableUpdateObj).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.movieType,e.num)},function(t){e.$notify({message:t,type:"error"})}),this.updateDialog=!1}}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[e._v("微电影审核表")]),e._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",{attrs:{"label-width":e.formLabelWidth}},[a("el-button",{attrs:{type:"primary"},on:{click:e.Add}},[e._v("新增")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:e.VMovieCheckTableList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:"","label-width":"100px"}},[a("el-form-item",{attrs:{label:"审核表编号:"}},[a("span",[e._v(e._s(t.row.vf_ve_ID))])]),e._v(" "),a("el-form-item",{attrs:{label:"视频类型:"}},[a("span",[e._v(e._s(t.row.vf_ve_TypeName))])]),e._v(" "),a("el-form-item",{attrs:{label:"创建视频时间:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_CreateTime))])]),e._v(" "),a("el-form-item",{attrs:{label:"分类名称:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_te_IDNames))])]),e._v(" "),a("el-form-item",{attrs:{label:"时长:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_Time))])]),e._v(" "),a("el-form-item",{attrs:{label:"首页大图:"}},[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.vf_ve_Content.vf_vo_TomImageURL,alt:""},on:{click:e.$seeImage}})]),e._v(" "),a("el-form-item",{attrs:{label:"大小:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_Size))])]),e._v(" "),a("el-form-item",{attrs:{label:"文件扩展名:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_Extend))])]),e._v(" "),a("el-form-item",{attrs:{label:"作者:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_AuthorName))])]),e._v(" "),a("el-form-item",{attrs:{label:"标题:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_Title))])]),e._v(" "),a("el-form-item",{attrs:{label:"简介:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_Introduce))])]),e._v(" "),a("el-form-item",{attrs:{label:"视频图片:"}},[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.vf_ve_Content.vf_vo_ImageURL,alt:""},on:{click:e.$seeImage}})]),e._v(" "),a("el-form-item",{attrs:{label:"备注:"}},[a("span",[e._v(e._s(t.row.vf_ve_Content.vf_vo_Remark))])]),e._v(" "),a("el-form-item",{attrs:{label:"视频:"}},[a("video",{attrs:{src:t.row.vf_ve_Content.vf_vo_FileURL,width:"320",height:"240",controls:"controls"}})])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"审核表编号",prop:"vf_ve_ID"}}),e._v(" "),a("el-table-column",{attrs:{label:"视频类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.vf_ve_TypeName)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建审核表时间",prop:"vf_ve_CreateTime"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){e.Update(t.row)}}},[e._v("修改\n          ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.Delete(t.row.vf_ve_ID)}}},[e._v("删除\n          ")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"添加",visible:e.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addDialog=t},close:e.closeDialog}},[a("el-form",{attrs:{model:e.addOptions}},[a("el-form-item",{attrs:{label:"请选择视频:","label-width":e.formLabelWidth}},[a("span",[e._v("单个视频不超过600M")]),e._v(" "),a("Upload",{attrs:{attrs:e.videoObj},on:{getData:e.passVideo}})],1),e._v(" "),a("el-form-item",{attrs:{label:"电影类型筛选:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{multiple:"",placeholder:"请选择电影类型"},on:{change:e.addParentChange},model:{value:e.parentTypeId,callback:function(t){e.parentTypeId=t},expression:"parentTypeId"}},e._l(e.VMovieTypeList,function(e){return a("el-option",{key:e.vf_te_ID,attrs:{label:e.vf_te_Name,value:e.vf_te_ID}})}))],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.isVisible,expression:"isVisible"}],attrs:{label:"分类名称:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{multiple:"",placeholder:"请选择分类名称"},model:{value:e.categoriesName,callback:function(t){e.categoriesName=t},expression:"categoriesName"}},e._l(e.VMovieChildTyeList,function(e){return a("el-option",{key:e.vf_te_ID,attrs:{label:e.vf_te_Name,value:e.vf_te_ID}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"标题:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"标题"},model:{value:e.addOptions.data.vf_ve_Content.vf_vo_Title,callback:function(t){e.$set(e.addOptions.data.vf_ve_Content,"vf_vo_Title",t)},expression:"addOptions.data.vf_ve_Content.vf_vo_Title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"首页大图:","label-width":e.formLabelWidth}},[a("span",[e._v("图片不超过600KB,且只上传一张图片")]),e._v(" "),a("Upload",{attrs:{attrs:e.imageObj},on:{getData:e.getData}}),e._v(" "),a("div",{staticClass:"imgWap"},e._l(e.ImageURL,function(t,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){e.deleteImageURL(t)}}},[e._v("X")]),e._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:e.radioIndex,callback:function(t){e.radioIndex=t},expression:"radioIndex"}},[e._v("替换")])],1),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:e.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:t,width:"280",height:"125"}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"视频图片:","label-width":e.formLabelWidth}},[a("span",[e._v("图片不超过600KB,且只上传一张图片")]),e._v(" "),a("Upload",{attrs:{attrs:e.imageObj},on:{getData:e.getDataOne}}),e._v(" "),a("div",{staticClass:"imgWapOne"},e._l(e.ImageURLOne,function(t,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){e.deleteImageURLOne(t)}}},[e._v("X")]),e._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:e.radioIndexOne,callback:function(t){e.radioIndexOne=t},expression:"radioIndexOne"}},[e._v("替换")])],1),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:e.ImageURLOne.length,expression:"ImageURLOne.length"}],attrs:{src:t,width:"280",height:"125"}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"简介:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"简介"},model:{value:e.addOptions.data.vf_ve_Content.vf_vo_Introduce,callback:function(t){e.$set(e.addOptions.data.vf_ve_Content,"vf_vo_Introduce",t)},expression:"addOptions.data.vf_ve_Content.vf_vo_Introduce"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详情:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"详情"},model:{value:e.addOptions.data.vf_ve_Content.vf_vo_Remark,callback:function(t){e.$set(e.addOptions.data.vf_ve_Content,"vf_vo_Remark",t)},expression:"addOptions.data.vf_ve_Content.vf_vo_Remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addSubmit}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改",visible:e.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.updateDialog=t},close:e.closeDialog}},[a("el-form",{attrs:{model:e.VMovieCheckTableUpdateObj}},[a("el-form-item",{attrs:{label:"审核表编码:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入审核表编码",disabled:e.isDisabled},model:{value:e.VMovieCheckTableUpdateObj.data.vf_ve_ID,callback:function(t){e.$set(e.VMovieCheckTableUpdateObj.data,"vf_ve_ID",t)},expression:"VMovieCheckTableUpdateObj.data.vf_ve_ID"}},[e._v(">\n          ")])],1),e._v(" "),a("el-form-item",{attrs:{label:"电影类型筛选:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{multiple:"",placeholder:"请选择电影类型"},on:{change:e.updateParentChange},model:{value:e.updateFilmType,callback:function(t){e.updateFilmType=t},expression:"updateFilmType"}},e._l(e.VMovieTypeList,function(e){return a("el-option",{key:e.vf_te_ID,attrs:{label:e.vf_te_Name,value:e.vf_te_ID}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"分类名称:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{multiple:"",placeholder:"请选择分类名称"},model:{value:e.updateCategoriesName,callback:function(t){e.updateCategoriesName=t},expression:"updateCategoriesName"}},e._l(e.VMovieChildTyeList,function(e){return a("el-option",{key:e.vf_te_ID,attrs:{label:e.vf_te_Name,value:e.vf_te_ID}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"首页大图:","label-width":e.formLabelWidth}},[a("span",[e._v("图片不超过600KB,且只上传一张图片")]),e._v(" "),a("Upload",{attrs:{attrs:e.imageObj},on:{getData:e.getUpdateData}}),e._v(" "),a("div",{staticClass:"imgWap"},e._l(e.ImageUpdateURL,function(t,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){e.deleteUpdateImageURLOne(t)}}},[e._v("X")]),e._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:e.radioUpdateIndex,callback:function(t){e.radioUpdateIndex=t},expression:"radioUpdateIndex"}},[e._v("替换")])],1),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:e.ImageUpdateURL.length,expression:"ImageUpdateURL.length"}],attrs:{src:t,width:"280",height:"125"}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"视频图片:","label-width":e.formLabelWidth}},[a("span",[e._v("图片不超过600KB,且只上传一张图片")]),e._v(" "),a("Upload",{attrs:{attrs:e.imageObj},on:{getData:e.getUpdateDataOne}}),e._v(" "),a("div",{staticClass:"imgWapOne"},e._l(e.ImageUpdateURLOne,function(t,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){e.deleteUpdateImageURLTwo(t)}}},[e._v("X")]),e._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:e.radioUpdateIndexOne,callback:function(t){e.radioUpdateIndexOne=t},expression:"radioUpdateIndexOne"}},[e._v("替换")])],1),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:e.ImageUpdateURLOne.length,expression:"ImageUpdateURLOne.length"}],attrs:{src:t,width:"280",height:"125"}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"上传视频:","label-width":e.formLabelWidth}},[a("span",[e._v("视频不超过600M")]),e._v(" "),a("video",{directives:[{name:"show",rawName:"v-show",value:e.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_FileURL,expression:"VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_FileURL"}],attrs:{src:e.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_FileURL,controls:"",width:"100"}}),e._v(" "),a("Upload",{attrs:{attrs:e.videoObj},on:{getData:e.updateVideo}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标题:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"标题"},model:{value:e.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Title,callback:function(t){e.$set(e.VMovieCheckTableUpdateObj.data.vf_ve_Content,"vf_vo_Title",t)},expression:"VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"简介:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"简介"},model:{value:e.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Introduce,callback:function(t){e.$set(e.VMovieCheckTableUpdateObj.data.vf_ve_Content,"vf_vo_Introduce",t)},expression:"VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Introduce"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详情:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"详情"},model:{value:e.VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Remark,callback:function(t){e.$set(e.VMovieCheckTableUpdateObj.data.vf_ve_Content,"vf_vo_Remark",t)},expression:"VMovieCheckTableUpdateObj.data.vf_ve_Content.vf_vo_Remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateSubmit}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var v=a("XAIM")(s,l,!1,function(e){a("5njY")},"data-v-371d2c28",null);t.default=v.exports},obBV:function(e,t,a){(e.exports=a("bKW+")(!1)).push([e.i,"\n.imgWap[data-v-371d2c28] {\n}\n.imgWap span[data-v-371d2c28] {\n     position: absolute;\n     right: -15px;\n     top: -6px;\n}\n.imgWap em[data-v-371d2c28] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n.imgWapOne span[data-v-371d2c28] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWapOne em[data-v-371d2c28] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])}});