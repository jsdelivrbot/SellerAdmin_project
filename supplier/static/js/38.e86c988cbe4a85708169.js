webpackJsonp([38],{VdB7:function(n,t,e){var a=e("tnmZ");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("60f23c76",a,!0)},d2zi:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("//Fk"),i=e.n(a),o=e("NYxO"),r={computed:Object(o.b)(["adminProductLine","adminTradeGoodList","updateAdminQueryProductInformationObj","adminProductLineManagementId"]),name:"",data:function(){return{data:[{label:"商家产品",children:[{label:"产品线路",children:[{label:"产品线路出发城市"},{label:"产品线路价格"},{label:"产品线路特色"},{label:"产品线路日程",children:[{label:"日程时间",children:[{label:"时间活动",children:[{label:"活动用餐"},{label:"活动景点"},{label:"活动购物"},{label:"活动住宿"},{label:"活动温馨提示"},{label:"活动交通"}]}]}]},{label:"产品线路费用说明"}]}]}],defaultProps:{children:"children",label:"label"},isOff:!0,userID:"",userName:"",initSearch:"",isLoading:!1,addAdminQueryProductInformationDialog:!1,updateAdminQueryProductInformationDialog:!1,value:"",formLabelWidth:"120px",addOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_GoodsListID:"",ts_pt_Name:"",ts_pt_Remark:""}}}},created:function(){var n=this.$route.query.lineID;n&&this.initData(n)},methods:{jump:function(n){sessionStorage.setItem("id",n.ts_pt_GoodsListID),window.open("http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/"+n.ts_pt_GoodsListID,"_blank")},toMerch:function(){sessionStorage.setItem("index",0),this.$router.push({name:"AdminMerchantProducts"})},handleSelect:function(n){this.value=n.id,this.updateAdminQueryProductInformationObj.ts_pt_GoodsListID=n.id,this.userName=n.value,this.userID=n.id,this.initData(n.id)},loadAll:function(n,t){var e=this;return new i.a(function(n,a){var i=JSON.parse(sessionStorage.getItem("admin")),o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:i.sm_ui_ID?i.sm_ui_ID:"",goodTitle:t||"",userID:"",pcName:"",ID:"",isDelete:0,page:1,rows:20};e.$store.dispatch("initAdminTradeGoodList",o).then(function(t){n(t)},function(n){e.$notify({message:n,type:"error"})})})},querySearchAsync:function(n,t){var e=this;this.loadAll(1,n).then(function(n){n=(n=n.data).map(function(n){return{id:n.ta_tg_ID,value:n.ta_tg_Title}}),e.restaurants=n,clearTimeout(e.timeout),e.timeout=setTimeout(function(){t(e.restaurants)},10)})},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:123,isDelete:0,goodID:n||""};this.isLoading=!0,this.$store.dispatch("initAdminProductLine",e).then(function(){t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})},search:function(){""!=this.value.trim()?(this.addOptions.data.ts_pt_GoodsListID=this.value,this.initData(this.value.trim())):this.$notify({message:"请选择对应产品!",type:"error"})},searchInitData:function(){this.adminProductLineManagementId&&this.initData(this.adminProductLineManagementId)},addAdminQueryProductInformation:function(){this.$store.commit("setTranstionFalse"),this.addAdminQueryProductInformationDialog=!0},addAdminQueryProductInformationSubmit:function(){var n=this;this.addOptions.data.ts_pt_GoodsListID=this.value,this.$store.dispatch("AddAdminQueryProductInformationSubmit",this.addOptions).then(function(){n.$notify({message:"添加成功!",type:"success"}),n.initData(n.value)},function(t){n.$notify({message:t,type:"error"})}),this.addAdminQueryProductInformationDialog=!1},updateAdminQueryProductInformation:function(n){this.updateAdminQueryProductInformationDialog=!0,this.$store.commit("setTranstionFalse"),this.$store.commit("initUpdateAdminQueryProductInformationObj",n)},updateAdminQueryProductInformationSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_ID:this.updateAdminQueryProductInformationObj.ts_pt_ID,ts_pt_GoodsListID:this.updateAdminQueryProductInformationObj.ts_pt_GoodsListID,ts_pt_Name:this.updateAdminQueryProductInformationObj.ts_pt_Name,ts_pt_Remark:this.updateAdminQueryProductInformationObj.ts_pt_Remark}};this.$store.dispatch("UpdateAdminQueryProductInformation",t).then(function(){n.$notify({message:"修改成功!",type:"success"}),n.initData(n.updateAdminQueryProductInformationObj.ts_pt_GoodsListID)},function(t){n.$notify({message:t,type:"error"})}),this.updateAdminQueryProductInformationDialog=!1},deleteAdminQueryProductInformation:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_pt_ID:n}};this.$store.dispatch("DeleteAdminQueryProductInformation",e).then(function(){t.$notify({message:"删除成功!",type:"success"}),t.initData(t.value)},function(n){t.$notify({message:n,type:"error"})})},productCharacteristicManagement:function(n){this.$store.commit("adminProductCharacteristicManagementId",n),this.$router.push({path:"/travel/AdminProductFeatures"}),sessionStorage.setItem("index","3")},queryProductInformationDetail:function(n){this.$store.commit("adminLineScheduleManagementId",n),this.$router.push({path:"/travel/adminQueryProductInformationList"}),sessionStorage.setItem("index","2")}},mounted:function(){this.searchInitData()}},s={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("产品线路信息")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item"),n._v(" "),e("el-form-item",[e("span",[n._v("产品筛选:")])]),n._v(" "),e("el-form-item",[e("el-autocomplete",{staticStyle:{width:"250px"},attrs:{size:"small","fetch-suggestions":n.querySearchAsync,placeholder:"请选择产品"},on:{select:n.handleSelect},model:{value:n.userName,callback:function(t){n.userName=t},expression:"userName"}})],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.addAdminQueryProductInformation}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminProductLine}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"线路编号"}},[e("span",[n._v(n._s(t.row.ts_pt_ID))])]),n._v(" "),e("el-form-item",{attrs:{label:"产品编号"}},[e("span",[n._v(n._s(t.row.ts_pt_GoodsListID))])]),n._v(" "),e("el-form-item",{attrs:{label:"行程名称"}},[e("span",[n._v(n._s(t.row.ts_pt_Name))])]),n._v(" "),e("el-form-item",{attrs:{label:"是否删除"}},[e("span",[n._v(n._s(0==t.row.ts_pt_IsDelete?"未删除":"已删除"))])]),n._v(" "),e("el-form-item",{attrs:{label:"备注"}},[e("span",[n._v(n._s(t.row.ts_pt_Remark))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"线路编号",prop:"ts_pt_ID"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"产品编号",prop:"ts_pt_GoodsListID"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"行程名称",prop:"ts_pt_Name"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){n.updateAdminQueryProductInformation(t.row.ts_pt_ID)}}},[n._v("修改\n          ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.deleteAdminQueryProductInformation(t.row.ts_pt_ID)}}},[n._v("删除\n          ")]),n._v(" "),e("el-button",{attrs:{size:"mini"},on:{click:function(e){n.queryProductInformationDetail(t.row.ts_pt_ID)}}},[n._v("\n            产品线路详情\n          ")]),n._v(" "),e("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){n.jump(t.row)}}},[n._v("预览效果\n          ")])]}}])})],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"添加线路",visible:n.addAdminQueryProductInformationDialog},on:{"update:visible":function(t){n.addAdminQueryProductInformationDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"产品名称:","label-width":n.formLabelWidth}},[e("el-autocomplete",{attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择产品"},on:{select:n.handleSelect},model:{value:n.userName,callback:function(t){n.userName=t},expression:"userName"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"线路名称:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入线路名称"},model:{value:n.addOptions.data.ts_pt_Name,callback:function(t){n.$set(n.addOptions.data,"ts_pt_Name",t)},expression:"addOptions.data.ts_pt_Name"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:n.addOptions.data.ts_pt_Remark,callback:function(t){n.$set(n.addOptions.data,"ts_pt_Remark",t)},expression:"addOptions.data.ts_pt_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addAdminQueryProductInformationDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addAdminQueryProductInformationSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改线路",visible:n.updateAdminQueryProductInformationDialog},on:{"update:visible":function(t){n.updateAdminQueryProductInformationDialog=t}}},[e("el-form",{attrs:{model:n.updateAdminQueryProductInformationObj}},[e("el-form-item",{attrs:{label:"产品名称:","label-width":n.formLabelWidth}},[e("el-autocomplete",{attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择产品"},on:{select:n.handleSelect},model:{value:n.userName,callback:function(t){n.userName=t},expression:"userName"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"线路名称:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入线路名称"},model:{value:n.updateAdminQueryProductInformationObj.ts_pt_Name,callback:function(t){n.$set(n.updateAdminQueryProductInformationObj,"ts_pt_Name",t)},expression:"updateAdminQueryProductInformationObj.ts_pt_Name"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入内容",type:"textarea",autosize:{minRows:6,maxRows:10}},model:{value:n.updateAdminQueryProductInformationObj.ts_pt_Remark,callback:function(t){n.$set(n.updateAdminQueryProductInformationObj,"ts_pt_Remark",t)},expression:"updateAdminQueryProductInformationObj.ts_pt_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateAdminQueryProductInformationDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateAdminQueryProductInformationSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=e("VU/8")(r,s,!1,function(n){e("VdB7")},null,null);t.default=l.exports},tnmZ:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});