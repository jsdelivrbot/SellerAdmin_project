webpackJsonp([9],{H8tN:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap span[data-v-d9a0c822] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-d9a0c822] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},VkJb:function(t,e,a){var i=a("H8tN");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("089783dd",i,!0)},d2zi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),o=a.n(i),n=a("pFYg"),r=a.n(n),s=a("//Fk"),d=a.n(s),l=a("NYxO"),u=a("TAej"),m=a("iTKD"),p={computed:Object(l.b)(["adminProductLine","adminTradeGoodList","adminProductLineManagementId","proviceList","cityList"]),name:"",components:{Upload:u.a,Editor:m.a},data:function(){return{ProviceID:"",ImageURL:[],updateImageURL:[],isNewUploaNode:!0,radioIndex:"",addRadioIndex:0,imageObj:{accept:"image/*"},data:[{label:"商家产品",children:[{label:"产品线路",children:[{label:"产品线路出发城市"},{label:"产品线路价格"},{label:"产品线路特色"},{label:"产品线路日程",children:[{label:"日程时间",children:[{label:"时间活动",children:[{label:"活动用餐"},{label:"活动景点"},{label:"活动购物"},{label:"活动住宿"},{label:"活动温馨提示"},{label:"活动交通"}]}]}]},{label:"产品线路费用说明"}]}]}],defaultProps:{children:"children",label:"label"},isOff:!0,userID:"",userName:"",initSearch:"",isLoading:!1,addAdminQueryProductInformationDialog:!1,updateAdminQueryProductInformationDialog:!1,value:"",formLabelWidth:"120px",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_GoodsListID:"",ts_pt_GoodName:"",ts_pt_Name:"",ts_pl_GoTime:"",ts_pl_LineDays:"",ts_pl_GroupCity:"",ts_pl_IsDefault:"1",ts_pt_Images:"",ts_pt_BookKnow:"",ts_pt_ReturnRule:"",ts_pt_IntroReason:"",ts_pt_Describe:"",ts_pt_FeeIn:"",ts_pt_FeeNotIn:"",ts_pt_LineDetail:"",ts_pt_LimitDuty:"",ts_pt_SpecialLimit:"",ts_pt_SafetyLimit:"",ts_pt_Remark:""}},restaurantsDay:[],updateAdminQueryProductInformationObj:{},id:"",num:0}},created:function(){for(var t=0;t<10;t++)this.restaurantsDay.push({value:t+1+""});this.id=this.$route.params.id,this.$store.dispatch("initProvice",{areaPid:3337}),this.initData(this.$route.params.id)},methods:{cacheForm:function(){window.location.reload(),this.addData=this.addOptions,this.ImageURL=[],this.addAdminQueryProductInformationDialog=!1},changeProvice:function(t){var e={areaPid:this.addOptions.data.ts_pl_GroupProvice};this.$store.dispatch("initCityList",e)},updateChangeProvice:function(t){this.updateAdminQueryProductInformationObj.ts_pl_GroupProvice=this.updateAdminQueryProductInformationObj.provice;var e={areaPid:this.updateAdminQueryProductInformationObj.provice};this.$store.dispatch("initCityList",e)},updateCity:function(){this.updateAdminQueryProductInformationObj.ts_pl_GroupCity=this.updateAdminQueryProductInformationObj.city},updateImage:function(t){this.radioIndex?(this.updateImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.updateImageURL.push(t.data)},getData:function(t){this.addRadioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.addRadioIndex=""):this.ImageURL.push(t.data)},deleteImageURL:function(t){this.isUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},querySearch:function(t,e){var a=this.restaurantsDay;e(t?a.filter(this.createFilter(t)):a)},createFilter:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},jump:function(t){t.ts_pt_GoodsListID?window.open("http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/"+t.ts_pt_GoodsListID,"_blank"):this.$notify({title:"警告",message:"产品编号为空。。。",type:"warning"})},toMerch:function(){sessionStorage.setItem("index",0),this.$router.push({name:"AdminMerchantProducts"})},handleSelect:function(t){this.value=t.id,this.updateAdminQueryProductInformationObj.ts_pt_GoodsListID=t.id,this.userName=t.value,this.userID=t.id,this.initData(t.id)},loadAll:function(t,e){var a=this;return new d.a(function(t,i){var o=JSON.parse(sessionStorage.getItem("admin")),n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:o.sm_ui_ID?o.sm_ui_ID:"",goodTitle:e||"",userID:"",pcName:"",ID:"",isDelete:0,page:1,rows:20};a.$store.dispatch("initAdminTradeGoodList",n).then(function(e){t(e)},function(t){a.$notify({message:t,type:"error"})})})},querySearchAsync:function(t,e){var a=this;this.loadAll(1,t).then(function(t){t=(t=t.data).map(function(t){return{id:t.ta_tg_ID,value:t.ta_tg_Title}}),a.restaurants=t,clearTimeout(a.timeout),a.timeout=setTimeout(function(){e(a.restaurants)},10)})},initData:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:123,isDelete:0,goodID:this.id};this.isLoading=!0,this.$store.dispatch("initAdminProductLine",a).then(function(){e.isLoading=!1},function(t){e.$notify({message:t,type:"error"})})},search:function(){""!=this.value.trim()?(this.addOptions.data.ts_pt_GoodsListID=this.value,this.initData(this.value.trim())):this.$notify({message:"请选择对应产品!",type:"error"})},searchInitData:function(){this.adminProductLineManagementId&&this.initData(this.adminProductLineManagementId)},addAdminQueryProductInformation:function(){for(var t in this.addOptions.data)if("object"==r()(this.addOptions.data[t]))for(var e in this.addOptions.data[t])this.addOptions.data[t][e]="";else this.addOptions.data[t]="";var a=document.querySelector(".uploader-list");a&&(a.querySelector("ul").innerHTML="");var i=document.querySelectorAll(".w-e-text");if(i&&i.length)for(var o=0;o<i.length;o++)i[o].innerHTML="";this.addAdminQueryProductInformationDialog=!0},addAdminQueryProductInformationSubmit:function(){var t=this;this.addOptions.data.ts_pt_GoodsListID=this.$route.params.id,this.ImageURL.length&&(this.addOptions.data.ts_pt_Images=this.ImageURL.join(",")),this.addOptions.data.ts_pl_IsDefault="1",this.$store.dispatch("AddAdminQueryProductInformationSubmit",this.addOptions).then(function(){t.$notify({message:"添加成功!",type:"success"}),t.initData(t.value)},function(e){t.$notify({message:e,type:"error"})}),this.addAdminQueryProductInformationDialog=!1},initProvice:function(t){var e={areaPid:t.ts_pl_GroupProvice};return this.$store.dispatch("initCityList",e)},updateAdminQueryProductInformation:function(t){var e=this;this.isLoading=!0,this.initProvice(t).then(function(){e.isLoading=!1,t.ts_pl_LineDays=t.ts_pl_LineDays+"",e.updateAdminQueryProductInformationObj=t,e.updateAdminQueryProductInformationDialog=!0},function(t){e.$notify({message:t,type:"error"})})},updateAdminQueryProductInformationSubmit:function(){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_ID:this.updateAdminQueryProductInformationObj.ts_pt_ID,ts_pt_GoodsListID:this.$route.params.id,ts_pt_Name:this.updateAdminQueryProductInformationObj.ts_pt_Name,ts_pt_Remark:this.updateAdminQueryProductInformationObj.ts_pt_Remark,ts_pl_GoTime:this.updateAdminQueryProductInformationObj.ts_pl_GoTime,ts_pl_LineDays:this.updateAdminQueryProductInformationObj.ts_pl_LineDays,ts_pl_GroupProvice:this.updateAdminQueryProductInformationObj.ts_pl_GroupProvice,ts_pl_GroupCity:this.updateAdminQueryProductInformationObj.ts_pl_GroupCity,ts_pl_IsDefault:this.updateAdminQueryProductInformationObj.ts_pl_IsDefault,ts_pt_IsDelete:this.updateAdminQueryProductInformationObj.ts_pt_IsDelete,ts_pt_IsIntroLine:this.updateAdminQueryProductInformationObj.ts_pt_IsIntroLine,ts_pt_Images:"",ts_pt_BookKnow:this.updateAdminQueryProductInformationObj.ts_pt_BookKnow,ts_pt_ReturnRule:this.updateAdminQueryProductInformationObj.ts_pt_ReturnRule,ts_pt_IntroReason:this.updateAdminQueryProductInformationObj.ts_pt_IntroReason,ts_pt_Describe:this.updateAdminQueryProductInformationObj.ts_pt_Describe,ts_pt_FeeIn:this.updateAdminQueryProductInformationObj.ts_pt_FeeIn,ts_pt_FeeNotIn:this.updateAdminQueryProductInformationObj.ts_pt_FeeNotIn,ts_pt_LineDetail:this.updateAdminQueryProductInformationObj.ts_pt_LineDetail,ts_pt_LimitDuty:this.updateAdminQueryProductInformationObj.ts_pt_LimitDuty,ts_pt_SpecialLimit:this.updateAdminQueryProductInformationObj.ts_pt_SpecialLimit,ts_pt_SafetyLimit:this.updateAdminQueryProductInformationObj.ts_pt_SafetyLimit}};this.updateImageURL.length&&(e.data.ts_pt_Images=this.updateImageURL.join(",")),this.$store.dispatch("UpdateAdminQueryProductInformation",e).then(function(){t.$notify({message:"修改成功!",type:"success"}),t.initData(t.updateAdminQueryProductInformationObj.ts_pt_GoodsListID)},function(e){t.$notify({message:e,type:"error"})}),this.updateAdminQueryProductInformationDialog=!1},deleteAdminQueryProductInformation:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_ID:t}};this.$store.dispatch("DeleteAdminQueryProductInformation",a).then(function(){e.$notify({message:"删除成功!",type:"success"}),e.initData(e.value)},function(t){e.$notify({message:t,type:"error"})})},productCharacteristicManagement:function(t){this.$store.commit("adminProductCharacteristicManagementId",t),this.$router.push({path:"/travel/AdminProductFeatures"}),sessionStorage.setItem("index","3")},queryProductInformationDetail:function(t){sessionStorage.setItem("lineObj",o()(t)),this.$router.push({name:"AdminQueryProductInformationList",params:{id:t.ts_pt_ID}}),sessionStorage.setItem("index","2")}},mounted:function(){this.searchInitData()}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("产品线路信息")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item"),t._v(" "),a("el-form-item",[a("span",[t._v("产品筛选:")])]),t._v(" "),a("el-form-item",[a("el-autocomplete",{staticStyle:{width:"250px"},attrs:{size:"small","fetch-suggestions":t.querySearchAsync,placeholder:"请选择产品"},on:{select:t.handleSelect},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addAdminQueryProductInformation}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.adminProductLine}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"线路编号:"}},[a("span",[t._v(t._s(e.row.ts_pt_ID))])]),t._v(" "),a("el-form-item",{attrs:{label:"产品编号:"}},[a("span",[t._v(t._s(e.row.ts_pt_GoodsListID))])]),t._v(" "),a("el-form-item",{attrs:{label:"线路名称:"}},[a("span",[t._v(t._s(e.row.ts_pt_Name))])]),t._v(" "),a("el-form-item",{attrs:{label:"出发时间:"}},[a("span",[t._v(t._s(e.row.ts_pl_GoTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"行程天数:"}},[a("span",[t._v(t._s(e.row.ts_pl_LineDays))])]),t._v(" "),a("el-form-item",{attrs:{label:"成团地点:"}},[a("span",[t._v(t._s(e.row.provice+e.row.city))])]),t._v(" "),a("el-form-item",{attrs:{label:"App中使用的图片:"}},t._l(e.row.ts_pt_Images,function(t){return a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"item"}],attrs:{alt:""}})})),t._v(" "),a("el-form-item",{attrs:{label:"推荐理由:"}},[a("div",{domProps:{innerHTML:t._s(e.row.ts_pt_IntroReason)}})]),t._v(" "),a("el-form-item",{attrs:{label:"产品线路介绍:"}},[a("div",{domProps:{innerHTML:t._s(e.row.ts_pt_Describe)}})]),t._v(" "),a("el-form-item",{attrs:{label:"行程明细:"}},[a("div",{domProps:{innerHTML:t._s(e.row.ts_pt_LineDetail)}})]),t._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("span",[t._v(t._s(e.row.ts_pt_Remark))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"线路编号",prop:"ts_pt_ID"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"产品编号",prop:"ts_pt_GoodsListID"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"线路名称",prop:"ts_pt_Name"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.updateAdminQueryProductInformation(e.row)}}},[t._v("修改\n          ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.deleteAdminQueryProductInformation(e.row.ts_pt_ID)}}},[t._v("删除\n          ")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.queryProductInformationDetail(e.row)}}},[t._v("\n            产品线路详情\n          ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.jump(e.row)}}},[t._v("预览效果\n          ")])]}}])})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"添加线路",visible:t.addAdminQueryProductInformationDialog,"close-on-click-modal":!1,width:"1150px"},on:{"update:visible":function(e){t.addAdminQueryProductInformationDialog=e}}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"线路名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入线路名称"},model:{value:t.addOptions.data.ts_pt_Name,callback:function(e){t.$set(t.addOptions.data,"ts_pt_Name",e)},expression:"addOptions.data.ts_pt_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"出发时间:","label-width":t.formLabelWidth}},[a("el-time-select",{attrs:{"picker-options":{start:"05:30",step:"00:05",end:"23:30"},placeholder:"选择时间"},model:{value:t.addOptions.data.ts_pl_GoTime,callback:function(e){t.$set(t.addOptions.data,"ts_pl_GoTime",e)},expression:"addOptions.data.ts_pl_GoTime"}}),t._v(" "),a("span",{staticStyle:{color:"#f60","padding-left":"20px"}},[t._v("提示:后端使用前端不显示!")])],1),t._v(" "),a("el-form-item",{attrs:{label:"行程天数:","label-width":t.formLabelWidth}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearch,placeholder:"请输入行程天数"},model:{value:t.addOptions.data.ts_pl_LineDays,callback:function(e){t.$set(t.addOptions.data,"ts_pl_LineDays",e)},expression:"addOptions.data.ts_pl_LineDays"}}),t._v(" "),a("span",{staticStyle:{color:"#f60","padding-left":"20px"}},[t._v("提示:后端使用前端不显示!")])],1),t._v(" "),a("el-form-item",{attrs:{label:"成团地点:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择省份"},on:{change:t.changeProvice},model:{value:t.addOptions.data.ts_pl_GroupProvice,callback:function(e){t.$set(t.addOptions.data,"ts_pl_GroupProvice",e)},expression:"addOptions.data.ts_pl_GroupProvice"}},t._l(t.proviceList,function(t){return a("el-option",{key:t.sm_af_AreaID,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaID}})})),t._v(" "),a("el-select",{attrs:{placeholder:"请选择市"},model:{value:t.addOptions.data.ts_pl_GroupCity,callback:function(e){t.$set(t.addOptions.data,"ts_pl_GroupCity",e)},expression:"addOptions.data.ts_pl_GroupCity"}},t._l(t.cityList,function(t){return a("el-option",{key:t.sm_af_AreaID,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"线路图片展示:","label-width":t.formLabelWidth,required:""}},[a("p",{staticStyle:{"font-weight":"bold",color:"#f60"}},[t._v("App中使用的图片")]),t._v(" "),a("p",[t._v("单张图片大小不能大于600KB")]),t._v(" "),a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative"}},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}}),t._v(" "),a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.addRadioIndex,callback:function(e){t.addRadioIndex=e},expression:"addRadioIndex"}},[t._v("替换")])],1)])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"推荐理由:","label-width":t.formLabelWidth}},[a("editor",{model:{value:t.addOptions.data.ts_pt_IntroReason,callback:function(e){t.$set(t.addOptions.data,"ts_pt_IntroReason",e)},expression:"addOptions.data.ts_pt_IntroReason"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"产品线路介绍:","label-width":t.formLabelWidth}},[a("editor",{model:{value:t.addOptions.data.ts_pt_Describe,callback:function(e){t.$set(t.addOptions.data,"ts_pt_Describe",e)},expression:"addOptions.data.ts_pt_Describe"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"行程明细:","label-width":t.formLabelWidth}},[a("editor",{model:{value:t.addOptions.data.ts_pt_LineDetail,callback:function(e){t.$set(t.addOptions.data,"ts_pt_LineDetail",e)},expression:"addOptions.data.ts_pt_LineDetail"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:t.addOptions.data.ts_pt_Remark,callback:function(e){t.$set(t.addOptions.data,"ts_pt_Remark",e)},expression:"addOptions.data.ts_pt_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addAdminQueryProductInformationDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addAdminQueryProductInformationSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改线路",visible:t.updateAdminQueryProductInformationDialog,"close-on-click-modal":!1,width:"70%"},on:{"update:visible":function(e){t.updateAdminQueryProductInformationDialog=e}}},[a("el-form",{attrs:{model:t.updateAdminQueryProductInformationObj}},[a("el-form-item",{attrs:{label:"线路名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入线路名称"},model:{value:t.updateAdminQueryProductInformationObj.ts_pt_Name,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pt_Name",e)},expression:"updateAdminQueryProductInformationObj.ts_pt_Name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"出发时间:","label-width":t.formLabelWidth}},[a("el-time-select",{attrs:{"picker-options":{start:"05:30",step:"00:10",end:"18:30"},placeholder:"选择时间"},model:{value:t.updateAdminQueryProductInformationObj.ts_pl_GoTime,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pl_GoTime",e)},expression:"updateAdminQueryProductInformationObj.ts_pl_GoTime"}}),t._v(" "),a("span",{staticStyle:{color:"#f60","padding-left":"20px"}},[t._v("提示:后端使用前端不显示!")])],1),t._v(" "),a("el-form-item",{attrs:{label:"行程天数:","label-width":t.formLabelWidth}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearch,placeholder:"请输入行程天数"},model:{value:t.updateAdminQueryProductInformationObj.ts_pl_LineDays,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pl_LineDays",e)},expression:"updateAdminQueryProductInformationObj.ts_pl_LineDays"}}),t._v(" "),a("span",{staticStyle:{color:"#f60","padding-left":"20px"}},[t._v("提示:后端使用前端不显示!")])],1),t._v(" "),a("el-form-item",{attrs:{label:"成团地点:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择省份"},on:{change:t.updateChangeProvice},model:{value:t.updateAdminQueryProductInformationObj.provice,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"provice",e)},expression:"updateAdminQueryProductInformationObj.provice"}},t._l(t.proviceList,function(t){return a("el-option",{key:t.sm_af_AreaID,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaID}})})),t._v(" "),a("el-select",{attrs:{placeholder:"请选择市"},on:{change:t.updateCity},model:{value:t.updateAdminQueryProductInformationObj.city,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"city",e)},expression:"updateAdminQueryProductInformationObj.city"}},t._l(t.cityList,function(t){return a("el-option",{key:t.sm_af_AreaID,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"展示图片:","label-width":t.formLabelWidth}},[a("p",{staticStyle:{"font-weight":"bold",color:"#f60"}},[t._v("App中使用的图片格式")]),t._v(" "),a("p",[t._v("单张图片大小不能大于600KB")]),t._v(" "),a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.updateImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.updateImageURL.length,expression:"updateImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"推荐理由:","label-width":t.formLabelWidth}},[a("editor",{model:{value:t.updateAdminQueryProductInformationObj.ts_pt_IntroReason,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pt_IntroReason",e)},expression:"updateAdminQueryProductInformationObj.ts_pt_IntroReason"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"产品线路介绍:","label-width":t.formLabelWidth}},[a("editor",{model:{value:t.updateAdminQueryProductInformationObj.ts_pt_Describe,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pt_Describe",e)},expression:"updateAdminQueryProductInformationObj.ts_pt_Describe"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"行程明细:","label-width":t.formLabelWidth}},[a("editor",{model:{value:t.updateAdminQueryProductInformationObj.ts_pt_LineDetail,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pt_LineDetail",e)},expression:"updateAdminQueryProductInformationObj.ts_pt_LineDetail"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:t.updateAdminQueryProductInformationObj.ts_pt_Remark,callback:function(e){t.$set(t.updateAdminQueryProductInformationObj,"ts_pt_Remark",e)},expression:"updateAdminQueryProductInformationObj.ts_pt_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateAdminQueryProductInformationDialog=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateAdminQueryProductInformationSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var _=a("VU/8")(p,c,!1,function(t){a("VkJb")},"data-v-d9a0c822",null);e.default=_.exports}});