webpackJsonp([36],{"/uu1":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("NYxO"),s={components:{Upload:a("TAej").a},computed:Object(i.b)(["foodStoreProductList","cuisineList"]),data:function(){return{isLoading:!1,addDialog:!1,addOptions:{fd_sfp_StoreFrontID:"",fd_sfp_Name:"",fd_sfp_Price:"",fd_sfp_MeatVeg:"",fd_sfp_Remark:"",fd_sfp_FoodTypeID:""},formLabelWidth:"120px",total:0,updateObj:{},updateDialog:!1,productId:0,meatType:[{label:"素菜",value:0},{label:"荤菜",value:1}],imageObj:{accept:"image/*"},addImage:[],isNewUploaNode:!0,addRadioIndex:0,updateRadioIndex:0}},created:function(){this.productId=this.$route.params.id,this.userInfo=JSON.parse(sessionStorage.getItem("admin")),this.initData(),this.initCuisine()},methods:{initCuisine:function(){var e=this;this.$store.dispatch("initCuisine",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",fd_py_ParentID:"1"}).then(function(){},function(t){e.$notify({message:t,type:"error"})})},jump:function(e){"审核中"==sessionStorage.getItem("status")?this.$notify({title:"警告",message:"审核中！请稍等。。。",type:"warning"}):window.open("http://hly.1000da.com.cn/index.html#/Comment/lineOrder?id="+e.fd_sfp_StoreFrontID,"_blank")},handleCurrentChange:function(e){this.initData(this.storeId,e)},initData:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",fd_sfp_StoreFrontID:this.productId,agentID:this.userInfo.sm_ui_ID,page:e||1,rows:"10"};this.isLoading=!0,this.$store.dispatch("initFoodStoreProduct",a).then(function(e){t.isLoading=!1,t.total=e},function(e){t.$notify({message:e,type:"error"})})},search:function(){this.initData(this.storeId)},add:function(){for(var e in this.addOptions)this.addOptions[e]="";this.addOptions.fd_sfp_StoreFrontID=this.productId,this.$store.commit("setTranstionFalse"),this.addDialog=!0},addSubmit:function(){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",images:this.addImage,data:this.addOptions};this.$store.dispatch("addFoodStoreProduct",t).then(function(t){e.$notify({message:t,type:"success"}),e.initData()},function(t){e.$notify({message:t,type:"error"})}),this.addDialog=!1},update:function(e){this.updateObj=e,this.$store.commit("setTranstionFalse"),this.updateDialog=!0},updateSubmit:function(){var e=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",token:"",images:this.updateObj.imgData,data:{fd_sfp_ID:this.updateObj.fd_sfp_ID,fd_sfp_StoreFrontID:this.updateObj.fd_sfp_StoreFrontID,fd_sfp_Name:this.updateObj.fd_sfp_Name,fd_sfp_MeatVeg:this.updateObj.fd_sfp_MeatVeg,fd_sfp_Price:this.updateObj.fd_sfp_Price,fd_sfp_Remark:this.updateObj.fd_sfp_Remark,fd_sfp_FoodTypeID:this.updateObj.fd_sfp_FoodTypeID}};this.$store.dispatch("updateFoodStoreProduct",t).then(function(t){e.$notify({message:t,type:"success"}),e.initData(e.storeId)},function(t){e.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_sfp_ID:e||""}};this.$store.dispatch("deleteFoodStoreProduct",a).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.storeId)},function(e){t.$notify({message:e,type:"error"})})},Apply:function(e){var t=this,a={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{fd_pi_StoreID:e||""}};this.$store.dispatch("applyRecommendFood",a).then(function(e){t.$notify({message:e,type:"success"}),t.initData(t.storeId)},function(e){t.$notify({message:e,type:"error"})})},getData:function(e){this.addRadioIndex?(this.addImage.splice(this.addRadioIndex-1,1,e.data),this.addRadioIndex=""):this.addImage.push(e.data)},deleteImageURL:function(e){this.isNewUploaNode=!1,this.addImage=this.addImage.filter(function(t){return t!=e})},updateData:function(e){this.updateRadioIndex?(this.updateObj.imgData.splice(this.updateRadioIndex-1,1,e.data),this.updateRadioIndex=""):this.updateObj.imgData.push(e.data)},deleteUpdateImageURL:function(e){this.isNewUploaNode=!1,this.updateObj.imgData=this.updateObj.imgData.filter(function(t){return t!=e})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[a("h1",{staticClass:"userClass"},[e._v("店面美食")]),e._v(" "),a("div",{staticClass:"btnBox"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.add}},[e._v("添加店面美食")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:e.foodStoreProductList}},[a("el-table-column",{attrs:{prop:"fd_sf_ProductName",label:"店面名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fd_py_Name",label:"美食菜系",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fd_sfp_Name",label:"美食名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fd_sfp_Price",label:"价格(元)",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"美食图片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.imgData,function(e,t){return a("img",{attrs:{src:e,alt:"",height:"50"}})})}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"fd_sfp_Remark",label:"美食介绍",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"400"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){e.update(t.row)}}},[e._v("修改\n          ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.Delete(t.row.fd_sfp_ID)}}},[e._v("删除\n          ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){e.Apply(t.row.fd_sfp_ID)}}},[e._v("申请首页推荐美食\n          ")]),e._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){e.jump(t.row)}}},[e._v("预览效果\n          ")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"text-align":"right"}},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.total,expression:"total"}],attrs:{"page-size":5,layout:"prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"添加店面菜肴",visible:e.addDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addDialog=t}}},[a("el-form",{attrs:{model:e.addOptions}},[a("el-form-item",{attrs:{label:"菜名:","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.addOptions.fd_sfp_Name,callback:function(t){e.$set(e.addOptions,"fd_sfp_Name",t)},expression:"addOptions.fd_sfp_Name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"荤素类型:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addOptions.fd_sfp_MeatVeg,callback:function(t){e.$set(e.addOptions,"fd_sfp_MeatVeg",t)},expression:"addOptions.fd_sfp_MeatVeg"}},e._l(e.meatType,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"菜系:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addOptions.fd_sfp_FoodTypeID,callback:function(t){e.$set(e.addOptions,"fd_sfp_FoodTypeID",t)},expression:"addOptions.fd_sfp_FoodTypeID"}},e._l(e.cuisineList,function(e){return a("el-option",{key:e.propertyID,attrs:{label:e.propertyName,value:e.propertyID}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"价格:","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.addOptions.fd_sfp_Price,callback:function(t){e.$set(e.addOptions,"fd_sfp_Price",t)},expression:"addOptions.fd_sfp_Price"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"美食图片:","label-width":e.formLabelWidth,required:""}},[a("Upload",{attrs:{attrs:e.imageObj},on:{getData:e.getData}}),e._v(" "),a("div",{staticClass:"imgWap"},e._l(e.addImage,function(t,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){e.deleteImageURL(t)}}},[e._v("X")]),e._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:e.addRadioIndex,callback:function(t){e.addRadioIndex=t},expression:"addRadioIndex"}},[e._v("替换")])],1),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:e.addImage.length,expression:"addImage.length"}],attrs:{src:t,width:"280",height:"125"}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"美食介绍:","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.addOptions.fd_sfp_Remark,callback:function(t){e.$set(e.addOptions,"fd_sfp_Remark",t)},expression:"addOptions.fd_sfp_Remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.addSubmit}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改店面菜肴",visible:e.updateDialog,"close-on-click-modal":!1},on:{"update:visible":function(t){e.updateDialog=t}}},[a("el-form",{attrs:{model:e.updateObj}},[a("el-form-item",{attrs:{label:"菜名:","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.updateObj.fd_sfp_Name,callback:function(t){e.$set(e.updateObj,"fd_sfp_Name",t)},expression:"updateObj.fd_sfp_Name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"美食图片:","label-width":e.formLabelWidth,required:""}},[a("Upload",{attrs:{attrs:e.imageObj},on:{getData:e.updateData}}),e._v(" "),a("div",{staticClass:"imgWap"},e._l(e.updateObj.imgData,function(t,i){return a("p",{staticStyle:{display:"inline-block",position:"relative","margin-right":"70px"}},[a("span",{staticStyle:{color:"#f60"},on:{click:function(a){e.deleteUpdateImageURL(t)}}},[e._v("X")]),e._v(" "),a("em",[a("el-radio",{attrs:{label:i+1},model:{value:e.updateRadioIndex,callback:function(t){e.updateRadioIndex=t},expression:"updateRadioIndex"}},[e._v("替换")])],1),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:e.updateObj.imgData.length,expression:"updateObj.imgData.length"}],attrs:{src:t,width:"280",height:"125"}})])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"荤素类型:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.updateObj.fd_sfp_MeatVeg,callback:function(t){e.$set(e.updateObj,"fd_sfp_MeatVeg",t)},expression:"updateObj.fd_sfp_MeatVeg"}},e._l(e.meatType,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"菜系:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.updateObj.fd_sfp_FoodTypeID,callback:function(t){e.$set(e.updateObj,"fd_sfp_FoodTypeID",t)},expression:"updateObj.fd_sfp_FoodTypeID"}},e._l(e.cuisineList,function(e){return a("el-option",{key:e.propertyID,attrs:{label:e.propertyName,value:e.propertyID}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"价格:","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.updateObj.fd_sfp_Price,callback:function(t){e.$set(e.updateObj,"fd_sfp_Price",t)},expression:"updateObj.fd_sfp_Price"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注:","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.updateObj.fd_sfp_Remark,callback:function(t){e.$set(e.updateObj,"fd_sfp_Remark",t)},expression:"updateObj.fd_sfp_Remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateSubmit}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var d=a("VU/8")(s,o,!1,function(e){a("i5fe")},"data-v-2b1cfed2",null);t.default=d.exports},"3OF3":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.btnBox[data-v-2b1cfed2] {\n  text-align: right;\n  padding: 10px 50px;\n}\n.imgWap span[data-v-2b1cfed2] {\n  position: absolute;\n  right: -15px;\n  top: -6px;\n}\n.imgWap em[data-v-2b1cfed2] {\n  position: absolute;\n  right: -55px;\n  top: 30px;\n  font-style: normal;\n  color: #42b983;\n}\n",""])},i5fe:function(e,t,a){var i=a("3OF3");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("473b397d",i,!0)}});