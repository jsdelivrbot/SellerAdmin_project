webpackJsonp([23],{"1Cr/":function(t,e,a){var i=a("SktC");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("ce14f306",i,!0)},SktC:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.imgWap[data-v-5215fd25] {\n}\n.imgWap span[data-v-5215fd25] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-5215fd25] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},sjPi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("//Fk"),o=a.n(i),s=a("bOdI"),l=a.n(s),r={bind:function(t,e){var a=t.querySelector(".el-dialog__header"),i=t.querySelector(".el-dialog");a.style.cssText+=";cursor:move;",i.style.cssText+=";top:0px;";var o=window.document.currentStyle?function(t,e){return t.currentStyle[e]}:function(t,e){return getComputedStyle(t,!1)[e]};a.onmousedown=function(t){var e=t.clientX-a.offsetLeft,s=t.clientY-a.offsetTop,l=i.offsetWidth,r=i.offsetHeight,n=document.body.clientWidth,d=document.body.clientHeight,c=i.offsetLeft,u=n-i.offsetLeft-l,m=i.offsetTop,p=d-i.offsetTop-r,_=o(i,"left"),h=o(i,"top");_.includes("%")?(_=+document.body.clientWidth*(+_.replace(/\%/g,"")/100),h=+document.body.clientHeight*(+h.replace(/\%/g,"")/100)):(_=+_.replace(/\px/g,""),h=+h.replace(/\px/g,"")),document.onmousemove=function(t){var a=t.clientX-e,o=t.clientY-s;-a>c?a=-c:a>u&&(a=u),-o>m?o=-m:o>p&&(o=p),i.style.cssText+=";left:"+(a+_)+"px;top:"+(o+h)+"px;"},document.onmouseup=function(t){document.onmousemove=null,document.onmouseup=null}}}},n=function(t){t.directive("el-drag-dialog",r)};window.Vue&&(window["el-drag-dialog"]=r,Vue.use(n)),r.install=n;var d=a("NYxO"),c=(a("jvWE"),{name:"",components:{Upload:a("TAej").a},data:function(){var t;return t={radioIndex:"",isShow:!1,updateImageURL:[],isUploaNode:!0,isNewUploaNode:!0,listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},obj:{},title:"",recommendedReasonContent:"",goodIntroduceContent:"",feeInfoListContent:"",updateGoodIntroduceContentObj:{},updateBuyReasonObj:{},recommendedReasonList:[],data:[{label:"商家产品",children:[{label:"产品线路",children:[{label:"产品线路出发城市"},{label:"产品线路价格"},{label:"产品线路特色"},{label:"产品线路日程",children:[{label:"日程时间",children:[{label:"时间活动",children:[{label:"活动用餐"},{label:"活动景点"},{label:"活动购物"},{label:"活动住宿"},{label:"活动温馨提示"},{label:"活动交通"}]}]}]},{label:"产品线路费用说明"}]}]}],defaultProps:{children:"children",label:"label"},value:"",userName:"",formLabelWidth:"120px",total:0,ImageURL:[],restaurants:[],isOff:!1,productsID:"",addDialog:!1,updateDialog:!1,addBuyReasonDialog:!1,updateBuyReasonDialog:!1,addGoodIntroduceDialog:!1,updateGoodIntroduceDialog:!1,addFeeInfoListDialog:!1,updateFeeInfoListDialog:!1,isLoading:!1,userObj:{},feeInfoList:[],feeNotInList:[],bookList:[],buyReason:[],goodIntroduce:[],updateAdminMerchantProductsObj:{},addData:{ts_tg_lowestPrice:"",ta_tg_TradeName:"",ta_tg_TradeID:"",ta_tg_ItemInfoID:"",ta_tg_Title:"",ts_tg_Country:"",ts_tg_Provice:"",ts_tg_City:"",ts_tg_GroupSite:"",ta_tg_Describe:"",ta_tg_ShowImage:"",ta_tg_Remark:"",ts_tg_ShowTop:"",ts_tg_Special:"",ts_tg_LongOut:"",ts_tg_Type:"",ts_tg_Property:""},addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",feeIn:[],feeNotIn:[],bookKnow:[],backRule:[],stayRecom:[],tourSiteRecom:[],buyReason:[],goodIntroduce:[],data:{}},updateFeeInfoListContentObj:{},feeNotInListContent:"",addFeeInNotListDialog:!1,updateFeeInNotListDialog:!1,updateFeeNotInListContentObj:{},bookListContent:"",addBookListDialog:!1,updateBookListDialog:!1,updateBookListContentObj:{},backRuleList:[],num:0,backRuleListContent:"",addBackRuleListDialog:!1,updateBackRuleListDialog:!1,updateBackRuleListContentObj:{},imageObj:{accept:"image/*"}},l()(t,"radioIndex",""),l()(t,"addRadioIndex",0),l()(t,"productCategoryList",[]),t},computed:Object(d.b)(["adminTradeGoodList","homeAdminGroupTourList","adminMerchantProductsId","proviceList","cityList"]),created:function(){this.$store.dispatch("initProvice",{areaPid:3337});var t=JSON.parse(sessionStorage.getItem("admin"));this.userObj=t,this.productsID=t.sm_ui_ID,this.getProductCategory()},methods:{getProductCategory:function(){var t=this;this.$store.dispatch("getProductCategory",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",ts_gi_ParentID:8}).then(function(e){t.productCategoryList=e})},updateImage:function(t){this.radioIndex?(this.updateImageURL.splice(this.radioIndex-1,1,t.data),this.radioIndex=""):this.updateImageURL.push(t.data)},getData:function(t){this.addRadioIndex?(this.ImageURL.splice(this.radioIndex-1,1,t.data),this.addRadioIndex=""):this.ImageURL.push(t.data)},jump:function(t){sessionStorage.setItem("id",t.ta_tg_ID),t.ta_tg_ID?window.open("http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/"+t.ta_tg_ID,"_blank"):this.$notify({title:"警告",message:"产品编号为空。。。",type:"warning"})},deleteUpdateImageURL:function(t){this.isNewUploaNode=!1,this.updateImageURL=this.updateImageURL.filter(function(e){return e!=t})},deleteImageURL:function(t){this.isUploaNode=!1,this.ImageURL=this.ImageURL.filter(function(e){return e!=t})},closeDialog:function(){this.ImageURL=[],this.updateImageURL=[],this.addDialog=!1,this.updateDialog=!1},cacheForm:function(){window.location.reload(),this.ImageURL=[],this.updateImageURL=[],this.addDialog=!1,this.updateDialog=!1},selectInitData:function(t,e){var a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",ts_gi_GoodID:t,ts_gi_ParentID:e||""};return this.$store.dispatch("initSelectInitAllData",a)},changeProvice:function(t){this.obj=this.proviceList.filter(function(e){return e.sm_af_AreaID==t})[0];var e={areaPid:this.value};this.$store.dispatch("initCityList",e)},changeUpdateProvice:function(t){this.obj=this.proviceList.filter(function(e){return e.sm_af_AreaID==t})[0];var e={areaPid:this.updateAdminMerchantProductsObj.ts_tg_Provice};this.$store.dispatch("initCityList",e)},handleSelect:function(t){this.userName=t.value,this.productsID=t.id,this.updateAdminMerchantProductsObj.ta_tg_TradeID=t.id,this.addData.ta_tg_TradeID=t.id},loadAll:function(t,e){var a=this;return new o.a(function(i,o){var s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tbUserID:"",tbName:e||"",isDelete:0,page:t||1,rows:5};a.$store.dispatch("AdminBusinessInformationSearch",s).then(function(t){i(t)},function(t){a.$message({message:t,type:"error"})})})},querySearchAsync:function(t,e){var a=this;this.loadAll(1,t).then(function(t){t=t.map(function(t){return{id:t.ts_tb_UserID,value:t.ts_tb_Name}}),a.restaurants=t,clearTimeout(a.timeout),a.timeout=setTimeout(function(){e(a.restaurants)},10)})},initData:function(t,e,a){var i=this,o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:t||"",goodTitle:a||"",userID:"",pcName:"",ID:"",isDelete:0,page:e||1,rows:10};this.num&&(o.page=this.num),this.isLoading=!0,this.$store.dispatch("initAdminTradeGoodList",o).then(function(t){i.total=t.totalRows,i.isLoading=!1},function(t){i.$notify({message:t,type:"error"})})},search:function(){this.initData(this.productsID,1,this.title)},searchInitData:function(){this.initData(this.productsID)},handleCurrentChange:function(t){this.num=t,this.initData(this.productsID,t)},addAdminMerchantProducts:function(){var t=document.querySelector(".uploader-list");for(var e in t&&(t.querySelector("ul").innerHTML=""),this.addOptions)"loginUserID"!=e&&"loginUserPass"!=e&&(this.addOptions[e]="");this.ImageURL=[],this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var t=this;this.addData.ta_tg_ShowImage=this.ImageURL.join(","),this.addOptions.buyReason=this.buyReason,this.addOptions.feeIn=this.feeInfoList,this.addOptions.feeNotIn=this.feeNotInList,this.addOptions.bookKnow=this.bookList,this.addOptions.backRule=this.backRuleList,this.addOptions.goodIntroduce=this.goodIntroduce,this.addData.ta_tg_TradeID=this.productsID,this.addData.ts_tg_Provice=this.obj.sm_af_AreaName,this.addOptions.data=this.addData,this.$store.dispatch("AddAdminMerchantProducts",this.addOptions).then(function(){t.$notify({message:"添加成功!",type:"success"}),t.initData(t.productsID,1)},function(e){t.$notify({message:e,type:"error"})}),this.addDialog=!1},updateAdminMerchantProducts:function(t){t.ts_tg_LongOut=t.ts_tg_LongOut+"",t.ts_tg_Type=t.ts_tg_Type+"",this.updateAdminMerchantProductsObj=t,this.updateImageURL=this.updateAdminMerchantProductsObj.ta_tg_ShowImages,this.updateDialog=!0},updateSubmit:function(){var t=this;isNaN(this.updateAdminMerchantProductsObj.ts_tg_Property)&&(this.updateAdminMerchantProductsObj.ts_tg_Property=this.updateAdminMerchantProductsObj.propertyName),this.updateAdminMerchantProductsObj.ts_tg_Provice=this.obj.sm_af_AreaName;var e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateAdminMerchantProductsObj};this.updateImageURL.length&&(this.updateAdminMerchantProductsObj.ta_tg_ShowImage=this.updateImageURL.join(",")),this.$store.dispatch("UpdateAdminMerchantProducts",e).then(function(){t.$notify({message:"修改成功!",type:"success"}),t.initData(t.productsID,1)},function(e){t.$notify({message:e,type:"error"})}),this.updateDialog=!1},DeleteAdminMerchantProducts:function(t){var e=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ta_tg_ID:t}};this.$store.dispatch("DeleteAdminMerchantProducts",a).then(function(){e.$notify({message:"删除成功!",type:"success"}),e.initData(e.productsID,1)},function(t){e.$notify({message:t,type:"error"})})},productLineManagement:function(t){this.$store.commit("adminProductLineManagementId",t),sessionStorage.setItem("MerchanID",t),this.$router.push({name:"AdminQueryProductInformation",params:{id:t}}),sessionStorage.setItem("index","1")}},mounted:function(){this.searchInitData()},updated:function(){}}),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[t._v("商家产品信息")]),t._v(" "),a("el-col",{staticClass:"formSearch",attrs:{span:24}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"产品标题:"}},[a("el-input",{attrs:{size:"small"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addAdminMerchantProducts}},[t._v("新增")])],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:t.adminTradeGoodList,"highlight-current-row":""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"商户编号:"}},[a("span",[t._v(t._s(e.row.ta_tg_TradeID))])]),t._v(" "),a("el-form-item",{attrs:{label:"产品标题:"}},[a("span",[t._v(t._s(e.row.ta_tg_Title))])]),t._v(" "),a("el-form-item",{attrs:{label:"推荐价格:"}},[a("span",[t._v("¥ "+t._s(e.row.ts_tg_lowestPrice))])]),t._v(" "),a("el-form-item",{attrs:{label:"所属省市:"}},[a("span",[t._v(t._s(e.row.ts_tg_Provice+e.row.ts_tg_City))])]),t._v(" "),a("el-form-item",{attrs:{label:"产品类型:"}},[a("span",[t._v(t._s(t._f("getTrandeType")(e.row.ts_tg_Type)))])]),t._v(" "),a("el-form-item",{attrs:{label:"产品图片地址:"}},t._l(e.row.ta_tg_ShowImages,function(t,e){return a("img",{key:e,attrs:{src:t,alt:"",width:"300",height:"150"}})})),t._v(" "),a("el-form-item",{attrs:{label:"产品创建时间:"}},[a("span",[t._v(t._s(e.row.ta_tg_CreateDateTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"备注:"}},[a("span",[t._v(t._s(e.row.ta_tg_Remark))])]),t._v(" "),a("el-form-item",{attrs:{label:"跟团类型:"}},[a("span",[t._v(t._s(t._f("getNewLongOut")(e.row.ts_tg_LongOut)))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"产品编码",prop:"ta_tg_ID"}}),t._v(" "),a("el-table-column",{attrs:{label:"产品标题",prop:"ta_tg_Title"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"ta_tg_CreateDateTime"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.updateAdminMerchantProducts(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.DeleteAdminMerchantProducts(e.row.ta_tg_ID)}}},[t._v("删除\n        ")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.productLineManagement(e.row.ta_tg_ID)}}},[t._v("产品线路管理\n        ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.jump(e.row)}}},[t._v("预览效果\n        ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{float:"right",padding:"30px 0 80px 0"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{"page-size":10,background:"",layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"添加产品",visible:t.addDialog,width:"1150px","close-on-click-modal":!1},on:{"update:visible":function(e){t.addDialog=e},close:t.closeDialog}},[a("el-form",{attrs:{model:t.addOptions}},[a("el-form-item",{attrs:{label:"产品标题:","label-width":t.formLabelWidth,required:""}},[a("el-input",{staticClass:"tg_Title",attrs:{placeholder:"请输入产品标题"},model:{value:t.addData.ta_tg_Title,callback:function(e){t.$set(t.addData,"ta_tg_Title",e)},expression:"addData.ta_tg_Title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"产品类别:","label-width":t.formLabelWidth,required:""}},[a("el-select",{attrs:{placeholder:"请选择产品类别"},model:{value:t.addData.ts_tg_Property,callback:function(e){t.$set(t.addData,"ts_tg_Property",e)},expression:"addData.ts_tg_Property"}},t._l(t.productCategoryList,function(t){return a("el-option",{key:t.ts_gi_ID,attrs:{label:t.ts_gi_Name,value:t.ts_gi_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"所属省:","label-width":t.formLabelWidth,required:""}},[a("el-select",{attrs:{placeholder:"请选择省份"},on:{change:t.changeProvice},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.proviceList,function(t){return a("el-option",{key:t.sm_af_AreaName,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"所属市:","label-width":t.formLabelWidth,required:""}},[a("el-select",{attrs:{placeholder:"请选择市"},model:{value:t.addData.ts_tg_City,callback:function(e){t.$set(t.addData,"ts_tg_City",e)},expression:"addData.ts_tg_City"}},t._l(t.cityList,function(t){return a("el-option",{key:t.sm_af_AreaID,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaName}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"推荐价格:","label-width":t.formLabelWidth}},[a("el-input",{staticClass:"tg_Title",attrs:{placeholder:"请输入推荐价格"},model:{value:t.addData.ts_tg_lowestPrice,callback:function(e){t.$set(t.addData,"ts_tg_lowestPrice",e)},expression:"addData.ts_tg_lowestPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"产品图片:","label-width":t.formLabelWidth,required:""}},[a("p",[t._v("单张图片大小不能大于600KB")]),t._v(" "),a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.getData}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.ImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.ImageURL.length,expression:"ImageURL.length"}],attrs:{src:e,width:"280",height:"125"}}),t._v(" "),a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.addRadioIndex,callback:function(e){t.addRadioIndex=e},expression:"addRadioIndex"}},[t._v("替换")])],1)])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"是否展示首页:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择是否精选"},model:{value:t.addData.ts_tg_Special,callback:function(e){t.$set(t.addData,"ts_tg_Special",e)},expression:"addData.ts_tg_Special"}},[a("el-option",{attrs:{label:"展示",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"不展示",value:"0"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"跟团类型:","label-width":t.formLabelWidth,required:""}},[a("el-select",{attrs:{placeholder:"请选择跟团类型"},model:{value:t.addData.ts_tg_LongOut,callback:function(e){t.$set(t.addData,"ts_tg_LongOut",e)},expression:"addData.ts_tg_LongOut"}},[a("el-option",{attrs:{label:"国内跟团 ",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"周边跟团",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"出境长线",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"出境短线",value:"3"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"产品类型:","label-width":t.formLabelWidth,required:""}},[a("el-select",{attrs:{placeholder:"请选择产品类型"},model:{value:t.addData.ts_tg_Type,callback:function(e){t.$set(t.addData,"ts_tg_Type",e)},expression:"addData.ts_tg_Type"}},[a("el-option",{attrs:{label:"跟团游 ",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"自由行",value:"1"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:t.addData.ta_tg_Remark,callback:function(e){t.$set(t.addData,"ta_tg_Remark",e)},expression:"addData.ta_tg_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cacheForm}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addSubmit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改产品",visible:t.updateDialog,width:"60%","close-on-click-modal":!1},on:{"update:visible":function(e){t.updateDialog=e},close:t.closeDialog}},[a("el-form",{attrs:{model:t.updateAdminMerchantProductsObj}},[a("el-form-item",{attrs:{label:"产品标题:","label-width":t.formLabelWidth,required:""}},[a("el-input",{staticClass:"tg_Title",attrs:{placeholder:"请输入产品标题"},model:{value:t.updateAdminMerchantProductsObj.ta_tg_Title,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ta_tg_Title",e)},expression:"updateAdminMerchantProductsObj.ta_tg_Title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"产品类别:","label-width":t.formLabelWidth,required:""}},[a("el-select",{attrs:{placeholder:"请选择产品类别"},model:{value:t.updateAdminMerchantProductsObj.propertyName,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"propertyName",e)},expression:"updateAdminMerchantProductsObj.propertyName"}},t._l(t.productCategoryList,function(t){return a("el-option",{key:t.ts_gi_ID,attrs:{label:t.ts_gi_Name,value:t.ts_gi_ID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"所属省:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择省份"},on:{change:t.changeUpdateProvice},model:{value:t.updateAdminMerchantProductsObj.ts_tg_Provice,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ts_tg_Provice",e)},expression:"updateAdminMerchantProductsObj.ts_tg_Provice"}},t._l(t.proviceList,function(t){return a("el-option",{key:t.sm_af_AreaName,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaID}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"所属市:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择市"},model:{value:t.updateAdminMerchantProductsObj.ts_tg_City,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ts_tg_City",e)},expression:"updateAdminMerchantProductsObj.ts_tg_City"}},t._l(t.cityList,function(t){return a("el-option",{key:t.sm_af_AreaID,attrs:{label:t.sm_af_AreaName,value:t.sm_af_AreaName}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"推荐价格:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入推荐价格"},model:{value:t.updateAdminMerchantProductsObj.ts_tg_lowestPrice,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ts_tg_lowestPrice",e)},expression:"updateAdminMerchantProductsObj.ts_tg_lowestPrice"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"产品图片:","label-width":t.formLabelWidth}},[a("p",[t._v("单张图片大小不能大于600KB")]),t._v(" "),a("Upload",{attrs:{attrs:t.imageObj},on:{getData:t.updateImage}}),t._v(" "),a("div",{staticClass:"imgWap"},t._l(t.updateImageURL,function(e,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){t.deleteUpdateImageURL(e)}}},[t._v("X")]),t._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:t.radioIndex,callback:function(e){t.radioIndex=e},expression:"radioIndex"}},[t._v("替换")])],1),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.updateImageURL.length,expression:"updateImageURL.length"}],attrs:{src:e,width:"280",height:"125"}})])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"跟团类型:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择跟团类型"},model:{value:t.updateAdminMerchantProductsObj.ts_tg_LongOut,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ts_tg_LongOut",e)},expression:"updateAdminMerchantProductsObj.ts_tg_LongOut"}},[a("el-option",{attrs:{label:"国内跟团 ",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"周边跟团",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"出境长线",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"出境短线",value:"3"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"产品类型:","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择产品类型"},model:{value:t.updateAdminMerchantProductsObj.ts_tg_Type,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ts_tg_Type",e)},expression:"updateAdminMerchantProductsObj.ts_tg_Type"}},[a("el-option",{attrs:{label:"跟团游 ",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"自由行",value:"1"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:t.updateAdminMerchantProductsObj.ta_tg_Remark,callback:function(e){t.$set(t.updateAdminMerchantProductsObj,"ta_tg_Remark",e)},expression:"updateAdminMerchantProductsObj.ta_tg_Remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cacheForm}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.updateSubmit}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(c,u,!1,function(t){a("1Cr/")},"data-v-5215fd25",null);e.default=m.exports}});